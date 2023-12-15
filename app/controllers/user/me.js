import {fileURLToPath} from 'url'
import {handleError} from '../../utils'

const __filename = fileURLToPath(import.meta.url)

export const me = async (req, res) => {
	const errLocation = `${__filename} #me()`
console.log('mee:', req.session.user)
	try {
		console.log('###req.session', req.session)
		return res.status(200).send({status_code: 200, success: true, data: req.session.user})
	} catch (err) {
		return handleError(err, res, {
			printTrace: true,
			useUUID: true,
			errLocation
		})
	}
}

export default me
