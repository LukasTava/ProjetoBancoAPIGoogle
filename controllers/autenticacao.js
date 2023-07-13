const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];

    const decodedToken = jwt.verify(token, 'token');

    req.user = { userId: decodedToken.userId };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Falha na autenticação' });
  }
};

module.exports = { autenticar };