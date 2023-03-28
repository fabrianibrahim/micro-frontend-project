const express = require('express');
const path = require('path');

const app = express();

app.use("/mfe/music", express.static("./music/build"));
app.use("/mfe/welcome", express.static("./welcome/dist"));
app.use("/", express.static("./bootstrap/dist"));

app.all('/*', function (req, res) {
  res.sendFile('index.html', { root: './bootstrap/dist' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
