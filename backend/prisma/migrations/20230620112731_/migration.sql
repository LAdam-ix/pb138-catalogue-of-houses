/*
  Warnings:

  - You are about to drop the column `cost` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `surename` on the `Account` table. All the data in the column will be lost.
  - Added the required column `price` to the `House` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_House" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL COLLATE NOCASE,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "designerId" TEXT NOT NULL,
    CONSTRAINT "House_type_fkey" FOREIGN KEY ("type") REFERENCES "HouseType" ("type") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "House_designerId_fkey" FOREIGN KEY ("designerId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_House" ("createdAt", "deletedAt", "description", "designerId", "id", "name", "type", "updatedAt") SELECT "createdAt", "deletedAt", "description", "designerId", "id", "name", "type", "updatedAt" FROM "House";
DROP TABLE "House";
ALTER TABLE "new_House" RENAME TO "House";
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "avatarId" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "type" TEXT NOT NULL,
    CONSTRAINT "Account_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "ImageLink" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Account_type_fkey" FOREIGN KEY ("type") REFERENCES "AccountType" ("type") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("avatarId", "createdAt", "deletedAt", "email", "hashedPassword", "id", "name", "type", "updatedAt") SELECT "avatarId", "createdAt", "deletedAt", "email", "hashedPassword", "id", "name", "type", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
