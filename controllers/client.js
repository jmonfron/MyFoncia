import clientSchema from '../schema/client'
import bcrypt from 'bcrypt'

async function get(req, res) {
  let page = req.query.page ? req.query.page : 1
  let nbClients = req.query.number ? req.query.number : 10

  const clients =  await clientSchema.getAll(page, nbClients)
  res.status(200).send({result: clients})
}


export default {
  get
}