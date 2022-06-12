const jwt = require('jsonwebtoken');

// ---------------- Création d'un token d'authentification ------------------

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Identifiant invalide (user ID)';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: "Requête invalide"
    });
  }

};