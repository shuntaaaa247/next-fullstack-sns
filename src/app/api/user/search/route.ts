import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const text = searchParams.get("text")
  
  if(!text) {
    return NextResponse.json({ message: "検索ワードを入れてください" }, { status: 400 });
  }

  const words: string[] = text.split(" ");

  try {
    await prisma.$connect()
    const results = await prisma.user.findMany({
      where: {
        AND: words.map(word => ({
          OR: [
            {
              username: {
                contains: word,
              },
            },
            {
              introduction: {
                contains: word,
              },
            }
          ]
        }))
      },
      include: {
        likes: true
      }
    })

    const _results = []
    for (const result of results) {
      const { password, ...other } = result
      _results.push(other)
    }
    return NextResponse.json({ message: "取得完了", results: _results }, { status: 200 });
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "取得失敗" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}