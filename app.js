const port = 3000;
const express = require("express");
const app = express();
const cors = require("cors");

const crawling = require("./crawling");
const checkID = require("./checkID");

app.use(cors());
app.use(express.json());

app.route("/naver/realtime").post((req, res) => {
  if (!checkID.validateIdNumber(req.body.id)) {
    return res.status(400).send({
      error: { status: 400, message: "유효한 주민번호가 아닙니다." },
    });
  }
  return crawling
    .parseHTML()
    .then((data) => {
      res.status(200).send({ data: data, message: "가져오기 완료" });
    })
    .catch((error) => {
      res.status(500).send({ error: { status: 500, message: "서버오류" } });
    });
});

app.listen(port, () => console.log(`App listening on ${port}`));
