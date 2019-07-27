const initialState = {
  loading: false,
  token: '',
  error: null
};
export default (state=initialState, action) => {
  switch(action.type) {
    case "LOGIN_SUCCESS":
      return {...state, token: action.token, loading: false};
    case 'SIGN_UP_SUCCESS':
      return {...state, token: action.token, loading: false};
    case 'LOADING':
      return {...state, loading: true};
    case 'FAILURE':
      return {...state, loading: false, error: action.error, token: ''};
    default:
      return state
  }
};