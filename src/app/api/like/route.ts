import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

//インスタンスを作成
const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const postId = searchParams.get("postId")
  const userId = searchParams.get("userId")
  
  if(!postId) {
    return NextResponse.json({ message: "いいねする投稿のIDを送信してください" }, { status: 400 })
  }
  if(!userId) {
    return NextResponse.json({ message: "いいねするユーザーのIDを送信してください" }, { status: 400 })
  }

  try {
    await prisma.$connect();
    const like = await prisma.like.create({
      data: {
        toPostId: Number(postId),
        fromUserId: Number(userId)
      }
    })
    return NextResponse.json({ message: "いいね完了", like: like }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "いいね失敗" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const postId = searchParams.get("postId");
  const userId = searchParams.get("userId");

  if(!postId) {
    return NextResponse.json({ message: "いいねする投稿のIDを送信してください" }, { status: 400 })
  }
  if(!userId) {
    return NextResponse.json({ message: "いいねするユーザーのIDを送信してください" }, { status: 400 })
  }

  try {
    await prisma.$connect()
    const deletedLike = await prisma.like.delete({
      where: {
        toPostId_fromUserId: {
          toPostId: Number(postId),
          fromUserId: Number(userId)
        }
      }
    })
    return NextResponse.json({ message: "削除成功" }, { status: 200 })
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "削除失敗" }, { status: 500 })
  } finally {
    await prisma.$disconnect();
  }
}