const express = require("express");
const https = require("https");
const app = express();

const MEDIUM_URL = "https://medium.com/@codingblackfemales/latest?format=json";

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
