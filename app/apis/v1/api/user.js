import express from 'express'

import * as UserController from '../../../controllers/user'

const router = express.Router()

router.post('/signup', UserController.signup)

export default router
