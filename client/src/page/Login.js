/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const LoginForm = () => (
  <div className={'form login'}>
      <div className={"link"}>
        <button className={"accent-bg"}>Sign In</button>
        <button className={"accent-bg"}>Sign Up</button>
      </div>
    <p><span>Sign In</span><span>or</span><span className={"accent-line"}>Sign Up</span></p>
    <div className="form-group">
      <label>FULL NAME</label>
      <input type={"text"} placeholder={"Enter your Full name"} />
    </div>
    <div className="form-group">
      <label>E-MAIL</label>
      <input type={'email'} placeholder={"Enter Your E-mail"} />
    </div>
    <div className="form-group">
      <label>Password</label>
      <input type={"password"} placeholder={"*********"}/>
    </div>
    <div className="form-group inline">
      <input className={"sign-in checkbox"} type={"checkbox"} />
      <p>I agree to all statements in <span className={"accent-line"}>terms of service</span></p>
    </div>
    <div className="form-group inline">
      <button className={"accent-bg"}>Sign Up</button>
      <p>I'm already member</p>
    </div>
  </div>
);

export default () => (<div className={"page login"}>
  <LoginForm />
</div>);
