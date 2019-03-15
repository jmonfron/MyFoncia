import tokenUtils from '../utils/cryptUtils'
import userSchema from '../schema/user'

const saltRounds = 10
const myPlaintextPassword = 'myfonciapassword'
const salt = 'random_key_for_salt'
const myLogin = 'john'


async function login(req, res) {
  const { login, password } = req.body
  if (!login || !password)
     return res.status(400).send({ message: 'login and/or password missing' })

  const userFound = await userSchema.find({ login })
  if (!userFound.length)
     return res.status(404).send({ message: 'user not found' })

  tokenUtils.compare(password, userFound[0].password, login, (err, token) => {
    if (err)
       return res.status(401).send({ message: 'password incorrect' })
     res.status(200).send({message: 'login success', token})
  })
}


export default {
  login
}