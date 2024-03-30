import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { ApiPostType } from "@/types";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const targetId: string = params.id;
  if(!targetId) {
    return NextResponse.json({ message: "目的のユーザーのIDを送信してください" }, { status: 400 })
  }

  try {
    await prisma.$connect()
    const profileLikes = await prisma.like.findMany({
      where: {
        fromUserId: Number(targetId)
      },
      include: {
        toPost: {
          include: {
            likes: true,
            replies: true
          }
        },
      },
    })
    
    let profileLikePosts: ApiPostType[] = [];
    for (const profileLike of profileLikes) {
      profileLikePosts.push(profileLike.toPost)
    }

    profileLikePosts = profileLikePosts.reverse()

    return NextResponse.json({ message: "取得成功", profileLikePosts: profileLikePosts }, { status: 200 });
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "取得失敗" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}