import express from 'express'
import userRoutes from './user'
import clientRoutes from './client'
import gestionnaireRoutes from './gestionnaire'
const router = express.Router()

router.use('/users', userRoutes)
router.use('/clients', clientRoutes)
router.use('/gestionnaire', gestionnaireRoutes)

export default router