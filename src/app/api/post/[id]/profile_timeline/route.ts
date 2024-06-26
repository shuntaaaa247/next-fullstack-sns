import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import type { ApiPostType } from "@/types";

//インスタンスを作成
const prisma = new PrismaClient();

export const GET = async (req: Request, { params }: { params: Params }) => {
  const targetId: string = params.id;

  if(!targetId) {
    return NextResponse.json({ message: "IDが見つかりません" }, { status: 400 })
  }

  try {
    await prisma.$connect()
    const profileTimelinePosts: ApiPostType[] | null = await prisma.post.findMany({
      where: {
        AND: [
          {
            autherId: Number(targetId)  
          },
          {
            OR:[
              {
                isReply: false
              },
              {
                isReply: null
              }
            ]
          }
        ]
        // autherId: Number(targetId)
      },
      include: {
        likes: true,
        replies: true
      },
      orderBy: { 
        createdAt: 'desc' 
      },
    })
    if(!profileTimelinePosts || profileTimelinePosts.length === 0) {
      return NextResponse.json({ message: "投稿が見つかりません" }, { status: 404 });
    }

    return NextResponse.json({ message: "取得成功", profileTimelinePosts: profileTimelinePosts }, { status: 200 });
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "取得失敗" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }

}