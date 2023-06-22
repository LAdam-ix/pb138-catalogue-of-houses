import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { PrismaTransactionHandle } from '../repositories/types/data';
import { Result } from '@badrap/result';

const STORAGEPATH = './public';

const imageSaver = async (
  image: string,
  tx: PrismaTransactionHandle,
  directory: string,
): Promise<Result<string>> => {
  const base64Data = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  const fileId = uuidv4();
  const filename = `${fileId}.${image.split(';')[0]!.split('/')[1]}`;
  const imagePath = `${STORAGEPATH}/${directory}/${filename}`;
  try {
    await fs.promises.writeFile(imagePath, base64Data, 'base64');
    await tx.imageLink.create({
      data: {
        id: fileId,
        path: imagePath,
      },
    });
    return Result.ok(fileId);
  } catch (error) {
    return Result.err(error as Error);
  }
};

export default imageSaver;
