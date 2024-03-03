import {NextResponse} from 'next/server';

import {getServerSession} from "next-auth/next"
import { options } from '@/options';

export async function GET() {
  const session = await getServerSession(options) // セッション情報を取得

  console.log(session?.user) // ユーザ情報を取得
  if(!session?.user) {
    return NextResponse.json({message: "no session"});
  }
  return NextResponse.json({message: "ok"});
}