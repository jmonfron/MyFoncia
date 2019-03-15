import jwt from 'jsonwebtoken'
const salt = 'random_key_for_jwt_token'

export default (req, res, next) => {
  const { headers: { authorization}, url } = req
  if (url === '/users/login')
    return next()
  jwt.verify(authorization, salt, err => {
    if (err)
      return res.status(401).send({ message: 'unauthorized' })
    next()
  });
  // return next()
}