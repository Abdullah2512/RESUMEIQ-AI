import jwt from "jsonwebtoken";

export function signToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
}

export function sendAuthResponse(res, user, statusCode = 200) {
  const token = signToken(user._id.toString());
  res.status(statusCode).json({
    token,
    user: user.toSafeJSON()
  });
}
