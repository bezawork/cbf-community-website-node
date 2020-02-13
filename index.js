const express = require("express");
const https = require("https");
const app = express();

const MEDIUM_URL = "https://medium.com/@codingblackfemales/latest?format=json";

app.get("/blog", (req, res) => {
  https.get(MEDIUM_URL, (err, apiRes, body) => {
    if (!err && apiRes.statusCode === 200) {
      let i = body.indexOf("{");
      const data = body.substr(i);
      res.send(data);
    } else {
      res.sendStatus(500).json(err);
    }
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT);
