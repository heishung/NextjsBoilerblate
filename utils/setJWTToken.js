import axios from 'axios';
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('configs/jwt');

const setJWTToken = (user) => {
  if (user) {
    try {
      jwt.sign(
        {
          user: {
            id: user.id,
            username: user.username,
            account_id: user.account_id,
          },
        },
        JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          axios.defaults.headers.common['x-jwt-token'] = token;
        }
      );
    } catch (err) {
      delete axios.defaults.headers.common['x-jwt-token'];
    }
  } else {
    delete axios.defaults.headers.common['x-jwt-token'];
  }
};

export default setJWTToken;
