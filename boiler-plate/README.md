## Node.js 와 express js 다운로드 하기
- Node.js is an open source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a brower.
- Express.js, or simply Express, is a web application framework from Node.js
- package.json -> npm init
- index.js -> 백엔드 시작점
- express.js 다운받기 -> npm install express --save

## MongoDB 연결하기
- 몽고사이트 -> https://www.mongodb.com/
- CLUSTER 클러스터 만들기(DATABASE)
- 몽고DB 유저 생성하기
- Mongoose -> https://www.npmjs.com/package/mongoose -> mongodb를 편하게 쓸수 있는 Object Modeling Tool이다.
- mongoose 다운받기 -> npm install mongoose --save
- app에서 연결됐는지 확인

## MongoDB Model & Schema
- Model - Schema 감싸주는 역할을 한다.
- Schema - 해당 컬렉션의 문서에 어떤 종류의 값이 들어가는지를 정의합니다.

## 회원가입 기능
- client request with Body the Json, buffer string and URL encoded data to server
- Body 데이터를 분석(parse)해서 req.body로 출력해주는 것
- Body-parser Dependency -> npm install body-parser --save
- Client에서 Request를 줘야 하는데 Client가 없어서 POSTMAN을 이용한다.
- POSTMAN 다운로드
- Register Route 만들기
- Node server실행해서 POSTMAN으로 Register Route에 요청을 보낸다.