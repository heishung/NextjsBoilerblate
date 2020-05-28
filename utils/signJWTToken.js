const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('configs/jwt');

export default (user) => {
  return new Promise(async (resolve, reject) => {
    if (!user) {
      reject(null);
    }
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
        if (err) {
          reject(null);
        }

        resolve(token);
      }
    );
  });
};
