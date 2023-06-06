import axios from 'axios';

export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const fetchUser = (username) => (dispatch, getState) => {
  const { user } = getState();

  if (user && user.login === username) {
    return;
  }

  axios
    .get(`https://api.github.com/users/${username}`)
    .then((response) => {
      dispatch(setUser(response.data));
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
