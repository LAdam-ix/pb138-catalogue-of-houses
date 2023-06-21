import prisma from '../client';
import { accounts, houses, imageLinksAccount, imageLinksHouses, ratings, orders } from './data';

const seed = async () => {
  console.log(`[${new Date().toISOString()}] Seed started`);

  // Create ImageLinks
  for (const imageLink of imageLinksAccount) {
    await prisma.imageLink.create({
      data: imageLink,
    });
  }

  // Create Accounts
  for (const account of accounts) {
    await prisma.account.create({
      data: account,
    });
  }

  // Create Houses
  for (const house of houses) {
    await prisma.house.create({
      data: house,
    });
  }
  for (const imageLink of imageLinksHouses) {
    await prisma.imageLink.create({
      data: imageLink,
    });
  }
  // Create Ratings
  for (const rating of ratings) {
    await prisma.rating.create({
      data: rating,
    });
  }

  // Create Orders
  for (const order of orders) {
    await prisma.order.create({
      data: order,
    });
  }

  console.log(`[${new Date().toISOString()}] Seed succeeded`);
};

seed()
  .catch((e) => {
    console.log(`[${new Date().toISOString()}] Seed failed`);
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
