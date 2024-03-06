import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getServerSession } from "next-auth";
import { options } from "@/options";

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

//session取得用(試験)
export const GET = async (req: Request, res: NextResponse) => {
  const session = await getServerSession(options);
  // const session = await getSession({ req })
  if(session) {
    return NextResponse.json({ id: session?.user.id }, { status: 200 });
  }
  return NextResponse.json({ message: "sessionなし" }, { status: 500 })
}


// PostメソッドでgetServerSessionが使えないため、不使用
export const POST = async (req: NextRequest, res: NextResponse) => {
  const { description, autherId } = await req.json();

  // 知識不足：apiルートのPOSTでgetServerSessionを使用してもsessionを取得できない。GETの場合はheadersをnext-authのheaders()にしたら取得できた。
  // const session = await getServerSession(options);
  // if(session?.user.id !== autherId) {
  //   console.log("session = ", session)
  //   return NextResponse.json({ message: "認証を通過しませんでした", description: description, autherId: autherId, token: token }, { status: 401 });
  // }

  if(!description) {
    return NextResponse.json({ message: "投稿内容を記述してください"}, { status: 400 })
  }
  if(!autherId) {
    return NextResponse.json({ message: "投稿者のIDを送信してください" }, { status: 400 });
  }

  try {
    await connect();
    const post = await prisma.post.create({
      data: {
        description: description,
        autherId: autherId
      }
    })
    return NextResponse.json({ message: "投稿完了", post: post }, { status: 200 })
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "投稿失敗" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}