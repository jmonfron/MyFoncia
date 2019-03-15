import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const secureKey = 'random_key_for_jwt_token'

export default {
  compare: (password, hash, user, cb) => {
    if (!password || !hash || !user)
      return cb('bad param', null)
    bcrypt.compare(password, hash, (err, resultPassword) => {
      if (err)
        return cb(err, null)
      if (!resultPassword)
        return cb('password incorrect', null)

      const token = jwt.sign({}, secureKey )
      return cb(null, token)
    })
  }
}
