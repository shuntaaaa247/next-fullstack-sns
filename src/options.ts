import type {NextAuthOptions, Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

interface Token extends JWT {
  accessToken?: string;
}

export const options: NextAuthOptions = {
  //このオプションに関してはこちらを参照 -> https://next-auth.js.org/configuration/options#description-2
  secret: process.env.NEXTAUTH_SECRET, //デプロイ時に必要
  debug: true,

  pages: {
    signIn: "/signin"
  },

  //strategyについては"jwt"を明示的に設定。
  //(他はデフォルト,アイドルセッションが期限切れとなり、無効となるまでの時間を表すmaxAgeはデフォルトで30days。generateSessionTokenもデフォルトの乱数生成方法で設定されている)
  session: {strategy: "jwt"}, 
  providers: [
    // GitHubProvider({
    //     clientId: process.env.GITHUB_ID!,
    //     clientSecret: process.env.GITHUB_SECRET!,
    // }),
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID!,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    // }),
    CredentialsProvider({
      id: "user", //フロントエンドでsignIn()関数を実行する際、signIn関数の第一引数に指定する文字列
      name: "Sign in",
      credentials: {
        email: {
          label: "Email", type: "email", placeholder: "example@example.com",
        },
        password: {label: "Password", type: "password"},
      },
      // メルアド認証処理
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/auth/get_user_with_signin", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials),
        })

        const json = await res.json();

        const user = json.user;

        if (res.ok && user) {
          return user
        } else {
          null;
        }

      }
    }),
  ],
  callbacks: {
    // jwt: async ({token, user, account, profile, isNewUser}) => {
    async jwt({token, user, account, profile, isNewUser}) {
      // 注意: トークンをログ出力してはダメ。(本番環境)
      // console.log('in jwt', {user, token, account, profile})

      if (user) {
        token.user = user; //session.userにidプロパティを付与するのに必要
        token.id = user.id; //session.userにidプロパティを付与するのに必要
      }
      if (account) {
        token.accessToken = account.access_token
        // console.log("accountがあります！");
      } else {
        // console.log("accountがありません")
      }
      return token;
    },
    // session: ({session, token, user}: { session: Session, token: Token, user: any }) => {
    async session({session, token, user}: { session: Session, token: Token, user: any }) {
      // console.log("in session", {session, token, user});
      // token.accessToken
      if(token && session.user) {
        session.user.id = token.id; //session.userにidプロパティを付与するのに必要

        session.user.accessToken = token.accessToken
        // console.log("session.user.accessToken", session.user.accessToken)
      }
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
  }
};