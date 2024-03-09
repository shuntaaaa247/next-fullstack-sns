-- CreateTable
CREATE TABLE "Like" (
    "toPostId" INTEGER NOT NULL,
    "fromUserId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("toPostId","fromUserId")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_toPostId_fkey" FOREIGN KEY ("toPostId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
