const axios = require("axios");
const cheerio = require("cheerio");

async function getHTML() {
  try {
    return await axios.get("https://www.naver.com");
  } catch (error) {
    console.log(error);
  }
}

getHTML().then((html) => {
  let titleList = [];
  console.log(html);
});
