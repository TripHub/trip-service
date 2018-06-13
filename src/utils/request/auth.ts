const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

export const hasAccessToken = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${process.env.AUTH_JWT_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH_JWT_AUDIENCE,
  issuer: `https://${process.env.AUTH_JWT_DOMAIN}/`,
  algorithms: ['RS256']
})
