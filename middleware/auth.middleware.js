const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [type, token] = authorization.split(" ");

  // проверка authorization в header
  if (!authorization) {
    return res.status(401).json("Ошибка авторизации");
  }

  // проверка type token'a
  if (type !== "Bearer") {
    return res.status(401).json("Неверный тип токена");
  }

  try {
    const decoder = await jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = decoder;

    next();
  } catch (error) {
    return res.status(401).json(error.toString());
  }
};
