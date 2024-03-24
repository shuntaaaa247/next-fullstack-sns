import { options } from "@/options";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
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

//フォロワー、フォロー中のユーザーを取得すつAPI
export const GET = async (req: NextRequest) => {
  const userId: number | null = Number(req.nextUrl.searchParams.get("id"))
  const mode: string | null = req.nextUrl.searchParams.get("mode")
  const users = [];
  try {
    await prisma.$connect()
    const targetUser = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        following: true,
        followers: true
      }
    })
    if(!targetUser) {
      return NextResponse.json({ message: "ユーザーが見つかりませんでした" }, { status: 404 })
    }
    const { username: targetUsername, ...other } = targetUser
    if (mode === "following") {
      for(const follow of targetUser?.following) {
        const user = await prisma.user.findUnique({
          where: {
            id: follow.followingId
          }
        })
        if(user) {
          const { password, ...other } = user
          users.push(other);
        }
      }
    } else if(mode === "followers") {
      for(const follow of targetUser?.followers) {
        const user = await prisma.user.findUnique({
          where: {
            id: follow.followerId
          }
        })
        if(user) {
          const { password, ...other } = user
          users.push(other);
        }
      }
    }
    return NextResponse.json({ message: "取得完了", targetUsername: targetUsername, users: users }, { status: 200 })
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "取得失敗" }, { status: 500 })
  } finally {
    await prisma.$disconnect();
  }
}

//フォロー用のAPI
export const POST = async (req: Request) => {
  const session = await getServerSession(options);
  const { followerId, followingId } = await req.json();

  if(!session) {
    return NextResponse.json({ message: "認証されていません" }, { status: 401 })
  }

  if(!followerId) {
    return NextResponse.json({ message: "followerIdがありません" }, { status: 400 })
  }

  if(!followingId) {
    return NextResponse.json({ message: "followingIdがありません" }, { status: 400 })
  }

  if(String(session.user.id) !== String(followerId)) {
    return NextResponse.json({ message: "権限がありません" }, { status: 403 })
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

//フォロー解除用のAPI
export const DELETE = async (req: Request) => {
  const session = await getServerSession(options);
  const { followerId, followingId } = await req.json();

  if(!followerId) {
    return NextResponse.json({ message: "followerIdがありません" }, { status: 400 })
  }
  if(!followingId) {
    return NextResponse.json({ message: "followingIdがありません" }, { status: 400 })
  }
  if(!session || !session.user.id) {
    return NextResponse.json({ message: "認証されていません" }, { status: 401 })
  }
  if(String(followerId) !== String(session?.user.id)) {
    return NextResponse.json({ message: "権限がありません" }, { status: 403 })
  }

  try {
    await connect();
    const unFollow = await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: Number(followerId),
          followingId: Number(followingId) 
        }
      }
    })
    return NextResponse.json({ message: "削除成功", unFollow: unFollow }, { status: 200 })
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "削除失敗" }, { status: 500 });
  }
}