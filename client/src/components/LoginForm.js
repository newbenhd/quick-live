import React from 'react';
import {connect} from 'react-redux';
import * as authActions from '../actions/auth.action';

class LoginForm extends React.Component {
  state = {
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
    }));
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginToken({
      email: this.state.email,
      password: this.state.password
    });
  };
  render() {
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>E-MAIL</label>
          <input name={"email"} value={this.state.email} onChange={this.handleInputChange} type={'email'} placeholder={"Enter Your E-mail"} required/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input name={"password"} value={this.state.password} onChange={this.handleInputChange} type={"password"} placeholder={"*********"} required/>
        </div>
        <div className="form-group inline">
          <input className={"sign-in checkbox"} type={"checkbox"} />
          <p>Remember me for 30 days</p>
        </div>
        <div className="form-group inline">
          <button className={"accent-bg"} type={"submit"}>Login</button>
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
      </form>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginToken: (payload) => {dispatch(authActions.loginToken(payload))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
