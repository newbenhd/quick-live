import axios from "axios";

export const loading = () => ({
  type: 'LOADING'
});

export const loginToken = (payload, history) => {
  return dispatch => {
    dispatch(loading());
    axios.post('/api/user/signIn', payload).then(res=>{
      dispatch(successLogin(res.data.token));
      history.push('/');
    }).catch(e=>{
      dispatch(fail(e));
    });
  }
};
export const successLogin = (token) => ({
  type: 'LOGIN_SUCCESS',
  token
});
export const fail = (error) => ({
  type: 'FAILURE',
  error
});

export const signUpToken = (payload, history) => {
  return dispatch => {
    dispatch(loading());
    axios.post('/api/user/signUp', payload).then(res=>{
      dispatch(successSignUp(res.data.token));
      history.push('/');
    }).catch(e=>{
      dispatch(fail(e));
    });
  };
};

export const successSignUp = (token) => ({
  type: 'SIGN_UP_SUCCESS',
  token
});
