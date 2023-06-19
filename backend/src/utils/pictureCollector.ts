import { House } from '@prisma/client';
import prisma from '../repositories/client';
import fs from 'fs/promises';


export async function pictureCollector() {
    try {
        // Get all pictures that are not associated with any House or Account
        const unusedPictures = await prisma.imageLink.findMany({
            where: {
                Account: { none: {} },
                House: null as unknown as House
            }
        });

        // Delete the unused pictures from the file system and database
        for (const picture of unusedPictures) {
            // Delete picture from the file system
            await fs.unlink(picture.path);

            // Delete picture record from the database
            await prisma.imageLink.delete({
                where: { id: picture.id }
            });
        }

        console.log('Unused pictures have been collected and deleted.');
    } catch (error) {
        console.error('Failed to collect and delete unused pictures:', error);
    } finally {
        await prisma.$disconnect();
    }
}
