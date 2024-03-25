import { options } from "@/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiPostType, PostType } from "@/types";
import { supabase } from "@/supabase";

const prisma = new PrismaClient();

export const DELETE = async (req: NextRequest) => {
  const session = await getServerSession(options);
  const { userId } = await req.json()

  if(!userId) {
    return NextResponse.json({ message: "削除するユーザーのIDを送信してください" }, { status: 400 })
  }

  if(!session) {
    return NextResponse.json({ message: "認証されていません" })
  }

  if(String(session.user.id) !== String(userId)) {
    return NextResponse.json({ message: "権限がありません" }, { status: 403 })
  }
  
  try {
    await prisma.$connect()

    const posts: ApiPostType[] = await prisma.post.findMany({
      where: {
        autherId: Number(userId)
      },
      include: {
        likes: true
      }
    });

    // console.log("あああああああああ")
    // console.log(posts);

    // return NextResponse.json({ message: "デバッグ用", posts: posts }, { status: 200 })

    for (const post of posts) {
      if(post.photo) {
        const { data, error } = await supabase
          .storage
          .from("photos")
          .remove([post.photo]);
        
          if(error) {
            console.log(error);
            return NextResponse.json({ message: "削除処理中のエラー：投稿画像を削除できませんでした" }, { status: 500 });
          }
      }
    }

    const targetUser = await prisma.user.findUnique({
      where: {
        id: Number(userId)
      }
    })

    if(targetUser?.avatar) {
      const { data, error } = await supabase
        .storage
        .from("avatars")
        .remove([targetUser.avatar]);
      if(error) {
        console.log(error);
        return NextResponse.json({ message: "削除処理中のエラー：投稿画像を削除できませんでした" }, { status: 500 });
      }
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(userId)
      }
    })
    return NextResponse.json({ message: "削除完了", deletedUser: deletedUser}, { status: 200 })
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "削除失敗" }, { status: 500 });
  } finally {
    await prisma.$disconnect()
  }
}