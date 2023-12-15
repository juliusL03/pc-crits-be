import {fileURLToPath} from 'url'
import {handleError} from '../../utils'

const __filename = fileURLToPath(import.meta.url)

const _destroySession = req => new Promise((resolve, reject) => {
	req.session.destroy((err) => {
		if (err) {
			reject(err)
		}
		
		resolve()
	})
})

export const logout = async (req, res) => {
	const errLocation = `${__filename} #logout()`

	try {
		if (req.session) {
			await _destroySession(req)
		}

		return res.status(200).send({status_code: 200, success: true, message: 'Successfully logout.'})
	} catch (err) {
		return handleError(err, res, {
			printTrace: true,
			useUUID: true,
			errLocation
		})
	}
}

export default logout
