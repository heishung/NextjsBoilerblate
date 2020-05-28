import axios from 'axios';

const setAccessToken = token => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

export default setAccessToken;
