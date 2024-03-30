import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/options";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const { description, autherId, photo, repliedToId } = await req.json();
  const session = await getServerSession(options);

  if(!session) {
    console.log("認証されていません");
    return NextResponse.json({ message: "認証されていません" }, { status: 401 })
  }

  if(!description) {
    return NextResponse.json({ message: "投稿内容を記述してください"}, { status: 400 })
  }
  
  if(!autherId) {
    return NextResponse.json({ message: "投稿者のIDを送信してください" }, { status: 400 });
  }

  if(String(session?.user.id) !== String(autherId)) {
    console.log("権限がありません")
    return NextResponse.json({ message: "権限がありません" }, { status: 403 })
  }
  try {
    await prisma.$connect();
    const reply = await prisma.post.create({
      data: {
        description: description,
        autherId: autherId,
        photo: photo,
        isReply: true,
        repliedToId: repliedToId
      }
    })
    return NextResponse.json({ message: "投稿完了", reply: reply }, { status: 200 })
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "投稿失敗" + err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}