/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

class LoginPage extends React.Component {
  state = {
    method: 'login',
    loginButtonClass: 'accent-bg left active',
    signUpButtonClass: 'accent-bg right'
  };
  changeForm = async (method) => {
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
      <div className={"page login"}>
        <div className={"form"}>
          <div className="link">
            <button className={`${this.state.loginButtonClass}`} onClick={(event)=>this.changeForm('login')}>Login</button>
            <button className={`${this.state.signUpButtonClass}`} onClick={(event)=>this.changeForm('signUp')}>Sign Up</button>
          </div>
          {
            this.state.method === 'login' ? <LoginForm /> : <SignUpForm />
          }
        </div>
      </div>
    );
  }
}

export default LoginPage;
