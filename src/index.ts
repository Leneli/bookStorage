const mongoose = require('mongoose');

const app = require('./server/server');
const config = require('../config');

const {port, mongo_url} = config;

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
