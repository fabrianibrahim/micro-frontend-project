const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' data:");
  next();
});

app.use('/', express.static(path.join(__dirname, 'bootstrap', 'dist')));
app.use('/mfe/welcome', express.static(path.join(__dirname, 'welcome', 'dist')));
app.use('/mfe/music', express.static(path.join(__dirname, 'music', 'build')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
