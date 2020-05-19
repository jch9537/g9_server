# g9_server

### 테스트 과제 서버

-> 서버는 배포상태가 아니므로 clone받아서 local에서 구동됩니다.<br/>

주민번호 유효성 확인 후 네이버 실시간 검색어 추출<br/>
사용 언어 : Javascript<br/>
사용 환경 : Node.js<br/>
사용 프레임워크/라이브러리 : express, cors, axios, cheerio<br/>

1. Client에 API제공
2. 주민번호 유효성 확인 : checkID.js
3. 네이버 실시간 검색어 HTML 가져오기 : crawling.js (getHTML)
4. 가져온 HTML 분석후 키워드 응답 : crawling.js (parseHTML)

- Server URI : http://ec2-18-221-37-6.us-east-2.compute.amazonaws.com:3000
- Endpoint : /naver/realtime
- Resource : IdNumber
- Method : POST
- Success Response : { data: data, message: "가져오기 완료" }
- Error Response :<br/>유효하지 않은 주민번호 일 때 {error: { status: 400, message: "유효한 주민번호가 아닙니다." }}
  <br/>서버오류 { error: { status: 500, message: "서버오류" } }
