const express = require("express");
const app = express();
const port = 3000;
// const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

//application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));

// application/json
// app.use(bodyParser.json());

// express에 기본적으로 포함되어 body-parser 설치할 필요 없음
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!~~안녕하세요 ~ ");
});

app.post("/api/users/register", async (req, res) => {
  // 회원가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣는다.
  const user = new User(req.body);

  // user.save((err, userInfo) => {
  //   if (err) return res.json({ success: false, err });
  //   return res.status(200).json({
  //     success: true,
  //   });
  // });

  // mongoose에 더 이상 콜백을 허용하지 않는다.
  const result = await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

app.post("/api/users/login", (req, res) => {
  //요청된 이메일을 db에서 찾는다
  // User.findOne({ email: req.body.email }, (err, user) =>({})
  // findOne()도 콜백함수를 지원하지 않기 때문에 promise 또는 async/await로 수정해야 한다
  // promise로 수정한 예
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메밀에 해당하는 유저가 없습니다.",
        });
      }

      //요청된 이메일이 db에 있으면 비밀번호가 맞는지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });

        // 비밀번호가 맞다면 토큰을 생성하기
        user.generateToken((err, user) => {
          // error -> 400
          if (err) return res.status(400).send(err);

          // 토큰을 저장한다. 어디에 ? 쿠키, 로컬스토리지 -- 쿠키로
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

// 여기서 auth는 middleware
app.get("/api/users/auth", auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True이다.
  // role 0 -> 일반유저     role 0이 아니면 관리자
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
