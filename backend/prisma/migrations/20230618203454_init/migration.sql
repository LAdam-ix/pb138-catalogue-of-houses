/*
  Warnings:

  - You are about to drop the column `pictureLinkId` on the `Account` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surename" TEXT NOT NULL,
    "avatarId" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "type" TEXT NOT NULL,
    CONSTRAINT "Account_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "ImageLink" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Account_type_fkey" FOREIGN KEY ("type") REFERENCES "AccountType" ("type") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("createdAt", "deletedAt", "email", "hashedPassword", "id", "name", "surename", "type", "updatedAt") SELECT "createdAt", "deletedAt", "email", "hashedPassword", "id", "name", "surename", "type", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
