// import { PrismaClient } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// //インスタンスを作成
// const prisma = new PrismaClient();

// export const GET = async (req: NextRequest) => {
//   try {
//     await prisma.$connect()
//     const body = await req.json();
//     const idList: string[] = body.idList
//     const userList = [];
//     for (const id of idList) {
//       const user = await prisma.user.findUnique({
//         where: {
//           id: Number(id)
//         }
//       })
//       userList.push(user);
//     }
//     return NextResponse.json({ message: "取得成功", users: userList }, { status: 200 })
//   } catch(err) {
//     console.log(err);
//     return NextResponse.json({ message: "取得失敗" }, { status: 500 })
//   } finally {
//     await prisma.$disconnect();
//   }
// }