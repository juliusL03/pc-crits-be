import {fileURLToPath} from 'url'
import * as services from '../../services/v1/user'
import {handleError} from '../../utils'


const __filename = fileURLToPath(import.meta.url)

export const signup = async (req, res) => {
	const errLocation = `${__filename} #signup()`

	try {
        const response = await services.signup(req.body)

		const {status_code: statusCode, message, data} = response
		
		if (statusCode !== 200) {
			return res.status(statusCode).send({success: false, status_code: statusCode, message})
		}

		req.session.authenticated = true
		req.session.user = data

		return res.status(statusCode).send({
			success: true,
			status_code: statusCode,
			data
		})
	} catch (err) {
		return handleError(err, res, {
			printTrace: true,
			useUUID: true,
			errLocation
		})
	}
}

export default signup
