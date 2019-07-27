export default (state = null, action) => {
  switch(action.type) {
    case 'FETCH_USER':
      return action.user || null;
    default:
      return state;
  }
}