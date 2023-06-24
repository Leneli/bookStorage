import fs from 'fs';
import os from 'os';

import {CONFIG} from '../config';

export const logger = (req: any, res: any, next: any) => {
  const now = new Date().toDateString();
  const {url, method} = req;
  const log = `${now}: ${method} ${url}`;

  fs.access(CONFIG.logs_dir_name, fs.constants.R_OK, (err: Error) => {
    if (!err) {
      fs.appendFile(CONFIG.logs_path, log + os.EOL, 'utf-8', (err: Error) => {
        if (err) throw err;
      });
    } else {
      try {
        fs.mkdirSync(CONFIG.logs_dir_name);
        fs.openSync(CONFIG.logs_path, 'w');
        fs.appendFileSync(CONFIG.logs_path, log + os.EOL, 'utf-8');
      } catch (error) {
        console.error("🚀 ~ file: logger.js:27 ~ fs.access ~ error:", error);
      }
    }
  });

  next();
};
