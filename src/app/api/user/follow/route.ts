import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

//インスタンスを作成
const prisma = new PrismaClient();

//データベースに接続
const connect = async () => { //connect()はexportできない。build時にエラーになる
  try {
    //prismaでデータベースに接続
    prisma.$connect;
  } catch(err) {
    console.log(err);
    return Error("データベースに接続できませんでした")
  }
}

//フォロー用のAPI
export const POST = async (req: Request) => {
  const { followerId, followingId } = await req.json();

  if(!followerId) {
    return NextResponse.json({ message: "followerIdがありません" }, { status: 400 })
  }
  if(!followingId) {
    return NextResponse.json({ message: "followingIdがありません" }, { status: 400 })
  }

  try {
    await connect();
    const follow = await prisma.follow.create({
      data: {
        followerId: Number(followerId),
        followingId: Number(followingId),
      }
    })
    return NextResponse.json({ message: "フォロー完了", follow: follow }, { status: 200 })
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "フォロー失敗", error: err }, { status: 500 })
  } finally {
    await prisma.$disconnect();
  }
}