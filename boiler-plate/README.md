# Node JS
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

# React JS
## About React
- 자바스크립트 라이브러리이다, Made by Facebook, Released in 2013
- Components module과 비슷하게 컴포넌트로 이루어져 있어서 reusable이 뛰어나다
- Virtual DOM
- Real DOM
  - 만약 10개 리스트가 있고, 그중에 한가지의 리스트가 변화가 일어날때(update)
  - 전체 리스트를 다시 Reload해야된다
  - Super Expensive한 작업
- Virtual DOM
  - 만약 10개 리스트가 있고, 그중에 한가지의 리스트가 변화가 일어날때(update)
  - 그 바뀐 한 가지 아이템만 DOM에서 바꿔주면 된다
- 둘 properties는 거의 같다
  - JSX를 렌더링 하면 Virtual DOM이 update된다
  - Virtual DOM이 이전 Virtual DOM에서 찍어둔 Snapshot과 비교해서 바뀐 부분을 찾는다
    - 이 과정은 diffing이라 한다
  - 그 부분만 Real DOM에서 바꾼다

## Create-react-app
- Babel -> 최신 자바스크립트 문법을 지원하지 않는 브라우저들을 위해 최신 자바스크립트 문법을 구형 브라우저에서도 돌수있게 변환시켜주는것
- Webpack -> 자바스크립트 모듈 번들러이다, 웹 어플리케이션에 필요한 (HTML, CSS, Javascript, Images)등을 하나의 파일로 혹은 여러개 파일로 병합 및 압축을 해주는 역할을 한다.
  - (주요한 요소로는 Entry, Output, Loaders, Plugins, Mode, Browser Compatibility가 있다)
- npx create-react-app .

## npm npx
- https://ljh86029926.gitbook.io/coding-apple-react/undefined/npm-npx

## React Router Dom
- Dependency 다운로드 -> npm install react-router-dom --save

## Data Flow & Axios
- request를 할때 지금까지 Client 부분이 없었기에 POSTMAN을 이용했다
- 하지만 이제 있으니깐 React JS부분에서 Request를 보내면 되는데, 그때 사용할게 AXIOS 라이브러리이다
- npm install axios --save