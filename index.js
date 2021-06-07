const fs = require('fs');
const express = require('express');
const app = express();
const config = require('./config');

app.listen(config.port, () =>
  console.log('App running on port: ', config.port)
);

app.get('/song', async (req, res) => {
  const range = req.headers.range || config.defaultRange;

  // In a real world scenario this would come from a cdn
  const path = './music/random-song.mp3';
  const size = fs.statSync(path).size;

  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + config.chunkSize, size - 1);

  res.status(206).header({
    'Content-Range': `bytes ${start}-${end}/${size}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': end - start + 1,
    'Content-Type': 'audio/mp3',
  });

  const stream = fs.createReadStream(path, { start, end });

  stream.pipe(res);
});
