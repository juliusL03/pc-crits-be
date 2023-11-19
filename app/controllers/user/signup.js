import {fileURLToPath} from 'url'
import * as SignUpApi from '../../services/v1/user/signup'
import {handleError} from '../../utils'


const __filename = fileURLToPath(import.meta.url)

export const signup = async (req, res) => {
	const errLocation = `${__filename} #signup()`

	try {
        const response = await SignUpApi(req.body)

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