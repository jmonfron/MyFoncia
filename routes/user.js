import express from 'express'
import userController from '../controllers/user'

const router = express.Router()

router.route('/login')
  .post(userController.login)

export default router