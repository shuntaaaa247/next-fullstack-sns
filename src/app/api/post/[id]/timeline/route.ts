import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getServerSession } from "next-auth";
import { options } from "@/options";
import type { PostType, FollowType } from "@/types";

//インスタンスを作成
const prisma = new PrismaClient();

export const GET = async (req: Request, { params }: { params: Params }) => {
  const targetId: string = params.id;
  const session = await getServerSession(options);
  // return NextResponse.json({ session: session }, { status: 200 });
  if(!session?.user.id || !targetId || Number(session.user.id) !== Number(targetId)) {
    return NextResponse.json({ message: "認証されていません"}, { status: 401 });
  }

  try {
    await prisma.$connect();
    let timelinePosts: PostType[] = [];
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${targetId}`);
    const resJson = await res.json();
    const following = resJson.user.following;

    const myPosts: PostType[] = await prisma.post.findMany({
      where: {
        autherId: Number(targetId)
      }
    })
    timelinePosts.push(...myPosts)

    await Promise.all(following.map(async (follow: FollowType) => {
      const posts: PostType[] = await prisma.post.findMany({
        where: {
          autherId: Number(follow.followingId)
        }
      })
      timelinePosts.push(...posts)
    }))
    
    return NextResponse.json({ message: "取得成功", timelinePosts: timelinePosts }, { status: 200 });
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "取得失敗" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}