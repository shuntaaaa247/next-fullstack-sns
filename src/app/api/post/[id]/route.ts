import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getServerSession } from "next-auth";
import { options } from "@/options";
import type { ApiPostType } from "@/types";

//インスタンスを作成
const prisma = new PrismaClient();

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  
  // const session = await getServerSession(options);
  // if(!session) {
  //   return NextResponse.json({ message: "認証されていません。ログインしてください" }, { status: 401 });
  // }
  
  try {
    await prisma.$connect();
    const post: ApiPostType | null = await prisma.post.findUnique({
      where: {
        id: Number(params.id)
      },
      include: {
        likes: true,
        // replies: true
        replies: {
          include: {
            likes: true,
            replies: true
          }
        }
      }
    })
    if (!post) {
      return NextResponse.json({ message: "投稿が見つかりませんでした" }, { status: 404 });
    }

    return NextResponse.json({ message: "投稿取得完了", post: post }, { status: 200 })
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "投稿取得失敗", error: err }, { status: 500 })
  } finally {
    await prisma.$disconnect();
  }
}