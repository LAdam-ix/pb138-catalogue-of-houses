-- CreateTable
CREATE TABLE "ImageLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "houseId" TEXT,
    CONSTRAINT "ImageLink_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Account" (
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

-- CreateTable
CREATE TABLE "AccountType" (
    "type" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "designerId" TEXT NOT NULL,
    CONSTRAINT "House_type_fkey" FOREIGN KEY ("type") REFERENCES "HouseType" ("type") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "House_designerId_fkey" FOREIGN KEY ("designerId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HouseType" (
    "type" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" REAL NOT NULL,
    "location" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "customerId" TEXT NOT NULL,
    "designerId" TEXT NOT NULL,
    CONSTRAINT "Order_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_designerId_fkey" FOREIGN KEY ("designerId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "customerId" TEXT NOT NULL,
    "designerId" TEXT NOT NULL,
    CONSTRAINT "Rating_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rating_designerId_fkey" FOREIGN KEY ("designerId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- AddEnums
BEGIN TRANSACTION;
INSERT INTO "HouseType" ("type") VALUES ("FAMILY_HOUSE");
INSERT INTO "HouseType" ("type") VALUES ("BUNGALOW");
INSERT INTO "HouseType" ("type") VALUES ("APARTMENT");
INSERT INTO "HouseType" ("type") VALUES ("COTTAGE");
INSERT INTO "HouseType" ("type") VALUES ("MANSION");

INSERT INTO "AccountType" ("type") VALUES ("USER");
INSERT INTO "AccountType" ("type") VALUES ("DESIGNER");
COMMIT;