-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "repliedToId" INTEGER;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_repliedToId_fkey" FOREIGN KEY ("repliedToId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
