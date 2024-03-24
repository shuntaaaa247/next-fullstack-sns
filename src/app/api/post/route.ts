import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/options";
import { ApiPostType } from "@/types";

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



export const POST = async (req: NextRequest, res: NextResponse) => {
  const { description, autherId, photo } = await req.json();

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
    await connect();
    const post = await prisma.post.create({
      data: {
        description: description,
        autherId: autherId,
        photo: photo
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



export const DELETE = async (req: NextRequest) => {
  const session = await getServerSession(options);
  const searchParams = req.nextUrl.searchParams
  const postId = searchParams.get("postId")

  if(!postId) {
    return NextResponse.json({ mmessage: "投稿のIDがありません" }, { status: 400 })
  }

  try {
    await connect();
    const post: ApiPostType | null  = await prisma.post.findUnique({
      where: {
        id: Number(postId)
      },
      include: {
        likes: true
      }
    })
    if(!post){
      return NextResponse.json({ method: "投稿がありません" }, { status: 404 });
    }
    if(post.autherId !== Number(session?.user.id)) {
      return NextResponse.json({ message: "権限がありません" }, { status: 401 });
    }
    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(postId)
      }
    })
    return NextResponse.json({ message: "削除成功", deletedPost: deletedPost }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "削除失敗" }, { status: 500 });
  } finally {
    await prisma.$disconnect()
  }
}