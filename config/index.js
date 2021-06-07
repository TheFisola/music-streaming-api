const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 5500,
  defaultRange: process.env.DEFAULT_RANGE || 'bytes=0-',
  chunkSize: process.env.CHUNK_SIZE || 10
};
