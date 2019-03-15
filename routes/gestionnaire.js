import express from 'express'
import gestionnaireController from '../controllers/gestionnaire'

const router = express.Router()

router.route('/:fullname')
  .get(gestionnaireController.get)

export default router