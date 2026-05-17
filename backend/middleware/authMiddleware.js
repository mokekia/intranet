// Verifies the JWT from the Authorization header (Bearer token) — attaches decoded user (id, name, email, role) to req.user — returns 401 if missing or invalid
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if(!token) return res.status(401).json( {message: 'No token provided'})
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch (error) {
    res.status(401).json( {message: 'Invalid token'} )
  }
}

module.exports = { authMiddleware }