const app = require('./server/server');
const config = require('../config');
const port = config.port;
const {createStore} = require('../src/store');

createStore();

app.listen(port, () => {
  console.log(`🚀 ~ App listening on port ${port}`);
});
