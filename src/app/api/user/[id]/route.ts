import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getServerSession } from "next-auth";
import { options } from "@/options";

//インスタンスを作成
const prisma = new PrismaClient();

// //データベースに接続
// const connect = async () => { //connect()はexportできない。build時にエラーになる
//   try {
//     //prismaでデータベースに接続
//     prisma.$connect;
//   } catch(err) {
//     console.log(err);
//     return Error("データベースに接続できませんでした")
//   }
// }

export const GET = async (req: Request, { params }: { params: Params }) => {
  try {
    const targetId: number = Number(params.id);
    await prisma.$connect();
    const user = await prisma.user.findUnique({
      where: {
        id: targetId
      },
      include: { 
        posts: true, //One To Manyで親(One)から子(many)を参照するには親の子要素配列フィールドをこのように設定してあげる必要がある。
        followers: true,
        following: true,
        likes: true
      },
    });
    if(user) {
      const { password, ...other } = user;
      return NextResponse.json({ message: "取得完了", user: other }, { status: 200 });
      // return NextResponse.json({ message: "取得完了", posts: posts }, { status: 200 });
    }
    return NextResponse.json({ message: "ユーザーが見つかりませんでした" }, { status: 404 })
  } catch(err) {
    console.error(err);
    return NextResponse.json({ message: "取得失敗" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }

}

export const PUT = async (req: NextRequest, { params }: { params: Params }) => {
  const { newUsername, newIntroduction } = await req.json();
  const session = await getServerSession(options);
  let user;

  try {
    await prisma.$connect();
    user = await prisma.user.findUnique({
      where: {
        id: Number(params.id)
      }
    })
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "ユーザー取得失敗" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }

  if(!user) {
    return NextResponse.json({ message: "ユーザーが見つかりませんでした" }, { status: 404 })
  }

  if(!newUsername && !newIntroduction) {
    return NextResponse.json({ message: "更新内容がありません" }, { status: 400 });
  }

  if(!session || String(session.user.id) !== String(params.id) ) {
    return NextResponse.json({ message: "権限がありません", sessionUserId: session?.user.id, paramsId: params.id }, { status: 401})
  }

  try {
    await prisma.$connect();
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(params.id)
      },
      data: {
        username: newUsername ?? user.username,
        introduction: newIntroduction ?? user.introduction
      }
    })
    return NextResponse.json({ message: "編集完了", updatedUser: updatedUser }, { status: 200 })
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "編集失敗" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}