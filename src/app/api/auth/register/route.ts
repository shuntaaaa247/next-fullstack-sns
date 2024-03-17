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

export const POST = async (req: Request, res: NextResponse) => {
  const { username, email, password } = await req.json(); //req.body -> req.json()

  if(username === "" || username == null) {
    return NextResponse.json({ message: "usernameを入力してください" }, { status: 400 })
  }

  if(email === "" || email == null) {
    return NextResponse.json({ message: "メールアドレスを入力してください" }, { status: 400 })
  }

  if(password === "" || password == null) {
    return NextResponse.json({ message: "passwordを入力してください" }, { status: 400 })
  }

  try {
    await connect();
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10)
      }
    })
    const { password: fetchedPassword, ...other } = user;
    return NextResponse.json({ message: "作成完了", user: other }, { status: 200 });
  } catch(err) {
    console.log(err);
    const userN = await prisma.user.findUnique({
      where: {
        username: username
      }
    })
    if(userN) {
      return NextResponse.json({ message: "そのユーザーネームはすでに使用されています" }, { status: 409})
    }
    const userE = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if(userE) {
      return NextResponse.json({ message: "そのメールアドレスはすでに使用されています" }, { status: 409})
    }
    return NextResponse.json({ message: "作成失敗" }, { status: 500 });
  } finally {
    await prisma.$disconnect
  }
}