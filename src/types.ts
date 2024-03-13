import { z } from "zod";

export const postInputs = z.object({
  description: z
    .string()
    .min(1, {
      message: "必須項目です。" //最小文字数1文字に満たなかったときのメッセージ
    })
    .max(140, {
      message: "投稿は140文字以内です。" //投稿が140文字を超えてしまった場合のメッセージ
    })
})

export type PostInputsType = z.infer<typeof postInputs>;

export const profileInputs = z.object({
  username: z
    .string()
    .min(1, {
      message: "必須項目です。"
    }),
  introduction: z
    .string()
})

export type ProfileInputsType = z.infer<typeof profileInputs>

export type PostType = {
  id: number,
  description: string,
  autherId: number,
  likes: LikeType[],
  createdAt: Date,
  updatedAt: Date,
}

export type FollowType = {
  followerId: Number,
  followingId: Number,
  createdAt: Date
}

export type LikeType = {
  toPostId: Number,
  fromUserId: Number
}

