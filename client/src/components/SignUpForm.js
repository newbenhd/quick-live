import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as authActions from '../actions/auth.action';

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
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.signUpToken({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }, this.props.history);
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

const mapStateToProps = ({auth}) => {
  return {
    auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpToken: (payload, history) => { dispatch(authActions.signUpToken(payload, history)) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpForm))
