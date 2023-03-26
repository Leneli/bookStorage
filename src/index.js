const app = require('./server/server');
const config = require('../config');
const port = config.port;

app.listen(port, () => {
  console.log(`🚀 ~ App listening on port ${port}`);
});
