const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, 'bootstrap', 'dist')));
app.use('/mfe/welcome', express.static(path.join(__dirname, 'welcome', 'dist')));
app.use('/mfe/music', express.static(path.join(__dirname, 'music', 'build')));

app.all('/*', function (req, res) {
  res.sendFile('index.html', { root: './bootstrap/dist' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
