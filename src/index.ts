import mongoose from 'mongoose';

import {app} from './server/server';
import {CONFIG} from './config';

const {port, mongo_url} = CONFIG;

async function appStart (PORT: string, bdUrl: string) {
  try {
    await mongoose.connect(bdUrl);
    console.log('🚀 ~ You successfully connected to MongoDB!', bdUrl);

    app.listen(PORT, () => {
      console.log(`🚀 ~ App listening on port ${PORT}`);
    });
  } catch (error) {
    console.log('🚀 ~ MongoDB error', bdUrl, error);
  }
}

appStart(port, mongo_url);
