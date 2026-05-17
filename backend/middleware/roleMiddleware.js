// Factory function: roleMiddleware('manager', 'admin') — returns a middleware that checks req.user.role — returns 403 if the role is not allowed

const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) return res.status(403).json( {message: 'Access denied'} ) 
    next()
    }
}
module.exports = { roleMiddleware }

