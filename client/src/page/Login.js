/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

class Form extends React.Component {
  state = {
    method: 'login',
    loginButtonClass: 'accent-bg left active',
    signUpButtonClass: 'accent-bg right'
  };
  changeForm = async (method) => {
    // this.setState((state,props)=>({
    //   method
    // }))
    try{
      await this.setState((prevState)=>{
        let loginButtonClass = prevState.loginButtonClass;
        let signUpButtonClass = prevState.signUpButtonClass;
        if(method === 'login') {
          loginButtonClass = 'accent-bg left active';
          signUpButtonClass = 'accent-bg right';
        } else if(method === 'signUp') {
          signUpButtonClass = 'accent-bg right active';
          loginButtonClass = 'accent-bg left';
        }
        return {
          ...prevState,
          loginButtonClass,
          signUpButtonClass,
          method
        }
      });
    } catch (e) {
      throw e
    }
  };
  render() {
    return (
      <div className={"form"}>
        <div className="link">
          <button className={`${this.state.loginButtonClass}`} onClick={(event)=>this.changeForm('login')}>Login</button>
          <button className={`${this.state.signUpButtonClass}`} onClick={(event)=>this.changeForm('signUp')}>Sign Up</button>
        </div>
        {
          this.state.method === 'login' ? <LoginForm/> : <SignUpForm/>
        }
      </div>
    );
  }
}

const SignUpForm = () => (


    <div className="signUp">
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
        <p className={"accent-line"}>I'm already member</p>
      </div>
    </div>
);

const LoginForm = () => (
  <div className="login">
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
      <p>Remember me for 30 days</p>
    </div>
    <div className="form-group inline">
      <button className={"accent-bg"}>Login</button>
      <p className={"accent-line"}>Forgot password?</p>
    </div>
    <div className="form-group">
      <p className={"or"}>or</p>
    </div>
    <div className="form-group">
      <button className="loginWith-button github">Sign in with Github</button>
    </div>
    <div className="form-group inline">
      <p>New?</p>
      <p className={"accent-line"}>Sign up here</p>
    </div>
  </div>
);

export default () => (<div className={"page login"}>
  <Form />
</div>);
