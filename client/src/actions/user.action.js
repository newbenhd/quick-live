import axios from 'axios';

export const fetchUser = async (token) => {
  const res = await axios.get('/api/user',{headers: {'Authorization': `Bearer ${token}`}});
  const user = res.data.user;
  return {
    type: 'FETCH_USER',
    user
  }
};
