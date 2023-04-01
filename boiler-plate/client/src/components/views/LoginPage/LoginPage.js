import React, { useState} from "react";
// import Axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {loginUser} from "../../../_actions/user_action";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHander = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onsubmitHandler = (event) => {
    // refresh 막아주기
    event.preventDefault();

    // console.log('Email', Email);
    // console.log('Password', Password);

    let body = {
      email: Email,
      password: Password,
    }

    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          navigate('/')
        } else {
          alert('Error˝')
        }
  })

  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onsubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHander} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
