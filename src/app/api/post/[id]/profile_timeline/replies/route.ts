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
    const profileReplies: ApiPostType[] = await prisma.post.findMany({
      where: {
        AND: [
          {
            autherId: Number(targetId)
          },
          {
            isReply: true
          }
        ]
      },
      include: {
        likes: true,
        replies: true
      },
      orderBy: { 
        createdAt: 'desc' 
      },
    })

    return NextResponse.json({ message: "取得成功", profileReplies: profileReplies }, { status: 200 });
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "取得失敗" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}