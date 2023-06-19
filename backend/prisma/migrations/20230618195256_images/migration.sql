/*
  Warnings:

  - You are about to drop the `PictureLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PictureLink";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ImageLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "houseId" TEXT,
    CONSTRAINT "ImageLink_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surename" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "type" TEXT NOT NULL,
    "pictureLinkId" TEXT NOT NULL,
    CONSTRAINT "Account_pictureLinkId_fkey" FOREIGN KEY ("pictureLinkId") REFERENCES "ImageLink" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Account_type_fkey" FOREIGN KEY ("type") REFERENCES "AccountType" ("type") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("createdAt", "deletedAt", "email", "hashedPassword", "id", "name", "pictureLinkId", "surename", "type", "updatedAt") SELECT "createdAt", "deletedAt", "email", "hashedPassword", "id", "name", "pictureLinkId", "surename", "type", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
