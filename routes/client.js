import express from 'express'
import clientController from '../controllers/client'

const router = express.Router()

router.route('/')
  .get(clientController.get)

export default router