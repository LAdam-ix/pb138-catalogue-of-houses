import { House } from '@prisma/client';
import fs from 'fs/promises';
import prisma from '../client';

async function pictureCollector() {
  try {
    const unusedPictures = await prisma.imageLink.findMany({
      where: {
        Account: { none: {} },
        House: null as unknown as House,
      },
    });

    unusedPictures.forEach(async (picture) => {
      // Delete picture from the file system
      await fs.unlink(picture.path);
      await prisma.imageLink.delete({
        where: { id: picture.id },
      });
    });
    console.log('Unused pictures have been collected and deleted.');
  } catch (error) {
    console.error('Failed to collect and delete unused pictures:', error);
  }
}

export default pictureCollector;
