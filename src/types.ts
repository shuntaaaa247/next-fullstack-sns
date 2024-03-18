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
    .string(),
    
  avatar: z //アバター画像追加
    .custom<FileList>()
    .refine((files) => files.length <= 1, {
      message: "画像ファイルは1枚までです。"
    })
    .refine((files) => Array.from(files).every((file) => file.size < 500_000), {
      message: "ファイルサイズは5MBまでです。"
    })
    .refine((files) => Array.from(files).every((file) => ["image/png", "image/jpg", "image/jpeg"].includes(file.type)), {
      message: "選択できるのはpng, jpg, jpegファイルです。"
    })
})

export type ProfileInputsType = z.infer<typeof profileInputs>

export const searchInputs = z.object({
  text: z
    .string()
    .min(1, {
      message: "必須項目です。"
    })
})

export type SearchInputsType = z.infer<typeof searchInputs>

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

