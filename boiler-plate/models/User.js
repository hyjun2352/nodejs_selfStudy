const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    //비밀번호를 암호화 시킨다
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPassword 예)12345678  =?   암회화된 비밀번호
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// save()는 더 이상 콜백함수를 지원하지 않는다
// userSchema.methods.generateToken = function (callback) {
//   var user = this;
//   console.log("user._id", user._id);
//   //jsonwebtoken을 이용해서 token을 생성하기
//   var token = jwt.sign(user._id.toHexString(), "secretToken");
//   // user._id + 'secretToken' = token
//   // ->
//   // 'secretToken' -> user._id

//   user.token = token;
//   user.save(function (err, user) {
//     if (err) return callback(err);
//     callback(null, user);
//   });
// };

//async await를 사용한다.
userSchema.methods.generateToken = async function (callback) {
  try {
    var user = this;
    console.log("user._id", user._id);
    //jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), "secretToken");

    user.token = token;
    await user.save();
    console.log("Token generating:", user.token);
    return callback(null, user);
  } catch (err) {
    console.error("Error generating token:", err);
    return callback(err);
  }
};

// Promise를 사용한다
// userSchema.methods.generateToken = function (callback) {
//   var user = this;
//   console.log("user._id", user._id);
//   //jsonwebtoken을 이용해서 token을 생성하기
//   var token = jwt.sign(user._id.toHexString(), "secretToken");

//   user.token = token;
//   return new Promise((resolve, reject) => {
//     user
//       .save()
//       .then((user) => {
//         console.log("Token generated:", user.token);
//         resolve(user);
//       })
//       .catch((err) => {
//         console.error("Error generating token:", err);
//         reject(err);
//       });
//   })
//     .then((user) => callback(null, user))
//     .catch((err) => callback(err));
// };

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  //토큰을 (복호화) decode 한다
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 toekn과 DB에 보관된 토큰이 일치하는지 확인

    // user.findOne({ _id: decoded, token: token }, function (err, user) {
    //   if (err) return cb(err);
    //   cb(null, user);
    // });
    user.findOne({ _id: decoded, token: token })
    .then((user) => {
      return cb(null, user);
    })
    .catch((err) => {
      return cb(err);
    });
  });
};

// schema를 모델로 감싸준다
const User = mongoose.model("User", userSchema);

module.exports = { User };

// - import / export 로 작성한 경우
// export default User;
