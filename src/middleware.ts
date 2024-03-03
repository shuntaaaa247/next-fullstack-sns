//このファイルはsrcディレクトリを作った場合はsrc配下におく。appディレクトリだったらapp配下？
export { default } from "next-auth/middleware"; // defaultをままでOK。

export const config = {
  // matcher: ["/"],
  matcher: ["/((?!register|api|signin).*)"], // ?!で否定を表す。"/"と"/register"と"/api"と"/signin"を除外してセッションが切れた時にsigninページに遷移
};