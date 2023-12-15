import express from 'express'

import * as UserController from '../../../controllers/user'
import { protectRoute } from '../../../utils/middleware'

const router = express.Router()

router.post('/signup', UserController.signup)

router.get('/me', protectRoute, UserController.me)

router.post(
	'/authenticate',
	UserController.authenticate
)

router.post(
	'/logout',
	UserController.logout
)

export default router
