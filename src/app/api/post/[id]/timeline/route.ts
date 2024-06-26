import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import type { ApiPostType, FollowType } from "@/types";

//インスタンスを作成
const prisma = new PrismaClient();

export const GET = async (req: Request, { params }: { params: Params }) => {
  const targetId: string = params.id;

  // const session = await getServerSession(options);
  // if(!session?.user.id || !targetId || Number(session.user.id) !== Number(targetId)) {
  //   return NextResponse.json({ message: "認証されていません"}, { status: 401 });
  // }

  if(!targetId) {
    return NextResponse.json({ message: "目的のユーザーのIDを送信してください" }, { status: 400 })
  }

  try {
    await prisma.$connect();
    let timelinePosts: ApiPostType[] = [];
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${targetId}`, {cache: "no-store"});
    const resJson = await res.json();
    const following = resJson.user.following;

    const myPosts: ApiPostType[] = await prisma.post.findMany({
      where: {
        autherId: Number(targetId)
      },
      include: {
        likes: true,
        replies: true,
      },
      orderBy: {
        createdAt: 'desc' 
      },
    })
    timelinePosts.push(...myPosts)

    await Promise.all(following.map(async (follow: FollowType) => {
      const posts: ApiPostType[] = await prisma.post.findMany({
        where: {
          autherId: Number(follow.followingId)
        },
        include: {
          likes: true,
          replies: true
        },
        orderBy: { 
          createdAt: 'desc' 
        },
      })
      timelinePosts.push(...posts)
    }))

    timelinePosts.sort(
      (x, y) => (y.createdAt.getTime()) - (x.createdAt.getTime()),
    );

    console.log("apiルートです(api/post/[id]/timeline");
    console.log(timelinePosts)
    
    return NextResponse.json({ message: "取得成功", timelinePosts: timelinePosts }, { status: 200 });
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "取得失敗" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}