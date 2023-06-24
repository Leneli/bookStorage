import {Buffer} from 'node:buffer';
import multer from 'multer';

import {CONFIG} from '../config';

const storage = multer.diskStorage({
  destination: CONFIG.public_books_dir,

  filename: (req: any, file: any, callback: any) => {
    const fileName = Buffer.from(file.originalname, 'latin1').toString('utf8');

    callback(null, `${new Date().toISOString()}-${fileName}`);
  },
});

export const fileMulter = multer({storage});
