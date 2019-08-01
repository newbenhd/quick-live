const defaultState = {
  loading: false,
  error: null,
  payload: undefined
};
export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SUCCESS_GET':
      return {
        ...state,
        payload: action.data,
        error: null,
        loading: false
      };
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    case 'FAIL':
      return {
        ...state,
        payload: undefined,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}