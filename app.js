const express = require("express");
const app = express();
const port = 8000;

const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

// const crawling = require("./crawling");

app.use(cors());
app.use(express.json());

app.route("/naver/realtime").get((req, res) => {
  console.log("겟");
  async function getHTML() {
    try {
      return await axios.get(
        "https://datalab.naver.com/keyword/realtimeList.naver"
      );
    } catch (error) {
      console.log(error);
    }
  }

  getHTML()
    .then(function (html) {
      // console.log(html);
      const titleList = [];
      const $ = cheerio.load(html.data);
      // console.log("html---", $("div#NM_FAVORITE #rtk .keyword_area").html());
      console.log("html---", $("div.list_group ul li").html());
      const searchList = $("div.list_group ul li");
      searchList.each(function (i, e) {
        const data = {};
        const rangking = $(e).children("div").children("span.item_num").text();
        const title = $(e)
          .children("div")
          .children("span")
          .children("span.item_title")
          .text();
        data[rangking] = title;
        titleList.push(data);
        console.log("타이틀", rangking, title);
      });
      console.log("타이틀리스트", titleList);
      return titleList;
    })
    .then((data) => res.status(200).send(data));
});

app.listen(port, () => console.log(`app listening on ${port}`));
