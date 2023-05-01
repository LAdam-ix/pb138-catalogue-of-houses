import prisma from '../client';
// import data from './data';

const seed = async () => {
  console.log(`[${new Date().toISOString()}] Seed started`);
  // seeding is here
};

seed().then(() => {
  console.log(`[${new Date().toISOString()}] Seed succeeded`);
}).catch((e) => {
  console.log(`[${new Date().toISOString()}] Seed failed`);
  console.log(e);
}).finally(async () => {
  await prisma.$disconnect();
});
