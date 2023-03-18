const express = require("express");
const app = express();
const port = 3000;
// const bodyParser = require('body-parser');
const { User } = require("./models/User");

//application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));

// application/json
// app.use(bodyParser.json());

// express에 기본적으로 포함되어 body-parser 설치할 필요 없음
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://mimokhj:abcd1234@boilerplate.re8cfx4.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!~~안녕하세요 ~ ");
});

app.post("/register", async (req, res) => {
  // 회원가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣는다.
  const user = new User(req.body)

  // user.save((err, userInfo) => {
  //   if (err) return res.json({ success: false, err });
  //   return res.status(200).json({
  //     success: true,
  //   });
  // });

  // mongoose에 더 이상 콜백을 허용하지 않는다.
  // https://stackoverflow.com/questions/75586474/mongoose-stopped-accepting-callbacks-for-some-of-its-functions
  const result = await user.save().then(()=>{
    res.status(200).json({
      success: true
    })
  }).catch((err)=>{
    res.json({ success: false, err})
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
