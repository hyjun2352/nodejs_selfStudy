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
- 하지만 express에 기본적으로 포함되어 body-parser 설치할 필요 없음
```
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json()); 대신 아래 코드 사용
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

  import / export 로 작성한 경우
    module.exports = { User } 대신 아래 코드 사용
    export default User;
``` 
- Client에서 Request를 줘야 하는데 Client가 없어서 POSTMAN을 이용한다.
- POSTMAN 다운로드
- Register Route 만들기
- Node server실행해서 POSTMAN으로 Register Route에 요청을 보낸다.
- *(model.save()는 더 이상 콜백을 허용하지 않는다)

## Nodemon 설치
- node mon -> 소스를 변경할때 그걸 감지해서 자동으로 서버를 재 시작해주는 tool
- node mon 다운로드 -> npm install nodemon --save-dev (npm i -D nodemon --save)
- 시작할때 nodemon으로 시작 -> package.json script 하나 더 만들기

## 비밀 설정 정보 관리
- 환경 변수 process.env.NODE_ENV
- local 환경 (development)& Deploy 배포 후(production)

## Bcrypt로 비밀번호 암호화 하기
- 비밀번호를 암호화해서 데이터베이스에 저장해야함 -> npm install bcrypt --save
- 우선 Register Route로 가기
- 유저 정보들을 (Account, Password)등을 데이터베이스에 저장하기 전 암호화
- bcrypt사이트 참고
- salt 생성

## 로그인 기능 만들기
- login route 만들기
- DB에서 요청한 email찾기 -> user.findOne()
- 요펑한 email이 있으면 비밀번호가 같은지 확인 -> bcrypt로 plain password와 암호화된 pw가 같은지 확인
- 같은면 Token생성 -> JSONWEBTOKEN 라이브러리 다운로드 -> npm install jsonwebtoken --save
- 토큰을 (쿠키, 로컬스토리지)에 저장한다.  쿠키 -> npm install cookie-parser --save
- model.findOne()도 콜백함수를 지원하지 않는다.
- 그럼으로 callback을 쓰지 않고 promise 또는 async/await로 수정해서 사용한다.

## Auth 기능 만들기
- Auth route 만들기
- 1. 페이지 이동 때마다 로그인되있는지, 안되어있는지 관리자 유저인지 체크
- 2. 글을 쓸때나 지울때 권한이 있는지도 체크
- Server - Token -> DB
- Client - Token -> Cookie
- Cookie에서 저장된 Token을 Server에서 가져와서 복호화한다.
- 복호화를 하면 User ID가 나오는데, 그 User ID를 이용해서 데이터베이스 User Collection에서 User를 찾은 후 쿠키에서 받아온 token이 유저도 갖고있는지 확인
  - 일치하지 않으면 Authentication False
  - 일치하면 Authentication True 그리고 해당하는 유저의 정보들을 선별해서(아이디 이미지등을) 프론트엔드로 보내줍니다.

## 로그아웃 기능 만들기
- 로그아웃 route 만들기
- 로그아웃 유저를 데이터베이스에서 찾아서 유저의 토큰을 지워준다.