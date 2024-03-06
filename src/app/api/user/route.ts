import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getServerSession } from "next-auth";
import { options } from "@/options";
import { getSession } from "next-auth/react";
import { headers } from "next/headers";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

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
