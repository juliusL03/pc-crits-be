import {fileURLToPath} from 'url'
import * as services from '../../services/v1/user'
import {handleError} from '../../utils'

const __filename = fileURLToPath(import.meta.url)

export const authenticate = async (req, res) => {
	const errLocation = `${__filename} #authenticate()`

	if (req.session?.authenticated) {
		return res.status(200).send(req.session)
	}

	try {
		const response = await services.authenticate(req.body)

  console.log('res::', response)
		const {status_code: statusCode, message, data: user} = response

		if (statusCode !== 200) {
			return res.status(statusCode).send({status_code: statusCode, message})
		}

  const hour = 3600000

		req.session.authenticated = true
		req.session.user = user
		req.session.ext_user_token = user._id
  req.session.cookie.expires = new Date(Date.now() + hour)

		return res.status(statusCode).send({status_code: 200, success: true, data: user})
	} catch (err) {
		return handleError(err, res, {
			printTrace: true,
			useUUID: true,
			errLocation
		})
	}
}

export default authenticate
