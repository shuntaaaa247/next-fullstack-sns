import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';


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

export const POST = async(req: Request) => {
  const { email, password } = await req.json();

  if(email === "" || email == null) {
    return NextResponse.json({ message: "メールアドレスを入力してください" }, { status: 400 })
  }

  if(password === "" || password == null) {
    return NextResponse.json({ message: "passwordを入力してください" }, { status: 400 })
  }

  try {
    await connect();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        // password: await bcrypt.hash(password, 10)
      },
      include: {
        posts: true
      }
    });

    if( user && await bcrypt.compare(password, user?.password)) { //bcrypt.compare("平文のパスワード", "ハッシュ化済みのパスワード")
      return NextResponse.json({ user: user }, { status: 200 });
    } else {
      return NextResponse.json({ message: "パスワードまたはメールアドレスが違います" }, { status: 401 });
    }
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "取得失敗" }, { status: 500 });
  } finally {
    await prisma.$disconnect
  }

}