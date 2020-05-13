const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  getHTML: async function () {
    try {
      return await axios.get(
        "https://datalab.naver.com/keyword/realtimeList.naver"
      );
    } catch (error) {
      //   console.log("-----------------------11", error);
      return error;
    }
  },
  parseHTML: function () {
    return this.getHTML().then((html) => {
      //   console.log("---------", html);
      const titleList = [];
      const $ = cheerio.load(html.data);
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
      });
      return titleList;
    });
  },
};
