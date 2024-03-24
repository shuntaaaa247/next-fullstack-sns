import { options } from "@/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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