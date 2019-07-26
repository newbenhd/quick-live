/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

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
          this.state.method === 'login' ? <LoginForm/> : <SignUpForm2/>
        }
      </div>
    );
  }
}

class SignUpForm extends React.Component {
  state = {
    name: '',
    email: '',
    password: ''
  };
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState((prevState)=>({
      ...prevState,
      [name]: value
    }))
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const res = await axios.post('/api/user/signUp',{
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      });
      console.log(res.data);
      this.setState((prevState)=>({
        ...prevState,
        name: '',
        email: '',
        password: ''
      }));
      const {history} = this.props;
      console.log(history);
      this.props.history.push('/')
    } catch(e) {
      console.log('failed to sign up');
    }
  };
  render() {
    return (
      <form className="signUp" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label>FULL NAME</label>
          <input name={'name'} value={this.state.name} onChange={this.handleInputChange} type={"text"} placeholder={"Enter your Full name"} required />
        </div>
        <div className="form-group">
          <label>E-MAIL</label>
          <input name={'email'} value={this.state.email} onChange={this.handleInputChange} type={'email'} placeholder={"Enter Your E-mail"} required/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input name={'password'} value={this.state.password} minLength={7} onChange={this.handleInputChange} type={"password"} placeholder={"*********"} required/>
        </div>
        <div className="form-group inline">
          <input className={"sign-in checkbox"} type={"checkbox"} />
          <p>I agree to all statements in <span className={"accent-line"}>terms of service</span></p>
        </div>
        <div className="form-group inline">
          <button type={'submit'} className={"accent-bg"}>Sign Up</button>
          <p className={"accent-line"}>I'm already member</p>
        </div>
      </form>
    );
  }
}

const SignUpForm2 = withRouter(SignUpForm);

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
      {/*<Link to={'/api/oauth/signIn'} className={"loginWith-button github"}>Sign in with Github</Link>*/}
      <a href={"/api/oauth/signIn"} className={"loginWith-button github"}>Sign in with Github</a>
      {/*<button className="loginWith-button github">Sign in with Github</button>*/}
    </div>
    <div className="form-group inline">
      <p>New?</p>
      <p className={"accent-line"}>Sign up here</p>
    </div>
  </div>
);

const page = () => (<div className={"page login"}>
  <Form />
</div>);

export default page;
