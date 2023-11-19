import express from 'express'

import v1Routes from './v1'

const router = express.Router()

router.use('/v1', v1Routes)

router.get('/', (req, res) => {
	res.status(200).send('200 OK')
})

export default router
