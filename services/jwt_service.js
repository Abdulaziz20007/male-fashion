const config = require("config");
const jwt = require("jsonwebtoken");

class JwtService {
  constructor(accessKey, refreshKey, accessTime, refreshTime) {
    this.accessKey = accessKey;
    this.refreshKey = refreshKey;
    this.accessTime = accessTime;
    this.refreshTime = refreshTime;
  }
  generateTokens(payload) {
    console.log(payload);

    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });

    // return accessToken, refreshToken;
    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, this.accessKey);
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, this.refreshKey);
  }
}

module.exports = new JwtService(
  config.get("accessKey"),
  config.get("refreshKey"),
  config.get("accessTime"),
  config.get("refreshTime")
);

// FOYDALANISH
// const jwtService = require("../services/jwt_service");

// const tokens = jwtService.generateTokens(payload)
