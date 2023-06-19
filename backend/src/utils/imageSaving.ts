import { PrismaTransactionHandle } from "../repositories/types/data";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const STORAGEPATH = './public';

export const imageSaver = async (image: string, tx: PrismaTransactionHandle, directory: string): Promise<string> => {
    const base64Data = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    const fileId = uuidv4(); // Separate ID without extension
    const filename = `${fileId}.${image.split(';')[0].split('/')[1]}`;
    const imagePath = `${STORAGEPATH}/${directory}/${filename}`; 
    // const imagePath = `${filename}`; 

    try {
        // Save the image file
        await fs.promises.writeFile(imagePath, base64Data, 'base64');
        await tx.imageLink.create({
            data: {
                id: fileId,
                path: imagePath,
            },
        });
    return fileId;
    } catch (error) {
        throw  error as Error;
    }
};
