const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  //네이버 실시간 검색어 HTML가져오기
  getHTML: async function () {
    try {
      return await axios.get(
        "https://datalab.naver.com/keyword/realtimeList.naver"
      );
    } catch (error) {
      return error;
    }
  },
  //실시간 검색어 파싱
  parseHTML: function () {
    return this.getHTML().then((html) => {
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
