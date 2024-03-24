import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

//インスタンスを作成
const prisma = new PrismaClient();

const getRandamNums = (min: number, max: number, num: number): number[] => {
  const nums: number[] = []
  for(let i = 0; i < num; i ++) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    if(!nums.includes(randomNum)) {
      nums.push(randomNum);
    } else {
      i--;
    }
  }
  return nums;
}

export const GET = async(req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const num: number | null = Number(searchParams.get("num"));
  if(!num) {
    return NextResponse.json({ message: "クエリパラメータnumがありません" }, { status: 400 });
  }
  try {
    await prisma.$connect()
    const numOfUsers: number = await prisma.user.count() //Userのレコード数を取得
    if(num > numOfUsers) {
      return NextResponse.json({ message: "numの値がレコード数を超えています" }, { status: 400 })
    }
    const randamIndexes: number[] = getRandamNums(0, numOfUsers-1, num);
    const allUsers = await prisma.user.findMany({});
    const randomUsers = [];
    for (const i of randamIndexes) {
      randomUsers.push(allUsers[i]);
    }

    return NextResponse.json({ message: "取得成功", randomUsers: randomUsers }, { status: 200})
  } catch(err) {
    console.log(err)
    return NextResponse.json({ message: "取得失敗", error: err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}