import axios from "axios";

export const loading = () => ({
  type: 'LOADING'
});

export const loginToken = payload => {
  return dispatch => {
    dispatch(loading());
    axios.post('/api/user/login', payload).then(res=>{
      dispatch(successLogin(res.data.token))
    }).catch(e=>{
      dispatch(fail(e));
    });
  }
};
export const successLogin = (token) => ({
  type: 'SUCCESS_LOGIN',
  token
});
export const fail = (error) => ({
  type: 'FAILURE',
  error
});

export const signUpToken = (payload) => {
  return dispatch => {
    dispatch(loading());
    axios.post('/api/user/signUp', payload).then(res=>{
      dispatch(successSignUp(res.data.token));
    }).catch(e=>{
      dispatch(fail(e));
    });
  };
};

export const successSignUp = (token) => ({
  type: 'SIGN_UP_SUCCESS',
  token
});
