import {fileURLToPath} from 'url'
import mongoose from 'mongoose'
import {User} from '../../../models'
import {log, password} from '../../../utils'

const {encryptPassword} = password

const __filename = fileURLToPath(import.meta.url)
const emailExist = async email => User.findOne({email})

const validateConfirmPassword = (password, confirmPassword) => password === confirmPassword

const signup = async (payload) => {
	log.info('Invoke #signup()', payload, __filename)
	
	const session = await mongoose.startSession()
	session.startTransaction()
	
	try {
		const {...userPayload} = payload

		if (await emailExist(userPayload.email)) {
			throw new Error('Email already in use!')
		}

		if (!validateConfirmPassword(userPayload.password, userPayload.confirm_password)) {
			throw new Error('Password confirmation did not match!')
		}

		const userId = new mongoose.Types.ObjectId()

		const {hashedPassword, salt} = await encryptPassword(userPayload.password)

		await User.create({
			...userPayload,
			password: hashedPassword,
			salt,
			_id: userId
		})

		const user = await User.findById(userId)

		session.commitTransaction()
		session.endSession()

		return {
			status_code: 200,
			data: user
		}
	} catch (error) {
		log.error(error)

		session.abortTransaction()
		session.endSession()

		return {status_code: 400, message: error.message}
	}
}


export default signup
