import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getServerSession } from "next-auth";
import { options } from "@/options";

//インスタンスを作成
const prisma = new PrismaClient();

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
  const { newUsername, newIntroduction, newAvatar } = await req.json();
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

  if(!session || !session.user.id) {
    return NextResponse.json({ message: "認証されていません" }, { status: 401 })
  }

  if(String(session.user.id) !== String(params.id) ) {
    return NextResponse.json({ message: "権限がありません", sessionUserId: session?.user.id, paramsId: params.id }, { status: 403})
  }

  try {
    await prisma.$connect();
    if(!newAvatar) {
      const updatedUser = await prisma.user.update({
        where: {
          id: Number(params.id)
        },
        data: {
          username: newUsername ?? user.username,
          introduction: newIntroduction ?? user.introduction,
        }
      })
      const { password, ...other } = updatedUser;
      return NextResponse.json({ message: "編集完了", updatedUser: other }, { status: 200 })
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(params.id)
      },
      data: {
        username: newUsername ?? user.username,
        introduction: newIntroduction ?? user.introduction,
        avatar: newAvatar ?? user.avatar
      }
    })
    const { password, ...other } = updatedUser;
    return NextResponse.json({ message: "編集完了", updatedUser: other }, { status: 200 })
  } catch(err) {
    console.log(err);
    return NextResponse.json({ message: "編集失敗" }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// export const DELETE = async (req: NextRequest) => {
//   const session = await getServerSession(options);
//   const searchParams = req.nextUrl.searchParams
//   const userId = searchParams.get("id")

//   if(!userId) {
//     return NextResponse.json({ message: "削除するユーザーのIDを送信してください" }, { status: 400 })
//   }

//   if(!session) {
//     return NextResponse.json({ message: "認証されていません" })
//   }

//   if(String(session.user.id) !== String(userId)) {
//     return NextResponse.json({ message: "権限がありません" }, { status: 403 })
//   }
  
//   try {
//     const deletedUser = await prisma.user.delete({
//       where: {
//         id: Number(userId)
//       }
//     })
//     return NextResponse.json({ message: "削除完了", deletedUser: deletedUser}, { status: 200 })
//   } catch(err) {
//     console.log(err);
//     return NextResponse.json({ message: "削除失敗" }, { status: 500 });
//   }
// }