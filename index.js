const express = require("express");
const https = require("https");
const app = express();
const Feed = require("rss-to-json");
const MEDIUM_URL = Feed.load(
  "https://medium.com/feed/codingblackfemales",
  function(err, rss) {
    console.log(rss);
  }
);

app.get("/blog", (req, resp) => {
  https
    .get(MEDIUM_URL, resp => {
      let data = "";
      resp.on("data", chunk => {
        data += chunk;
      });
      resp.on("end", () => {
        console.log(data);
      });
    })
    .on("error", err => {
      console.log("Error: " + err.message);
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT);
