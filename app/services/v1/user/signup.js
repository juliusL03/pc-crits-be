import {fileURLToPath} from 'url'
import mongoose from 'mongoose'

import {User} from '../../../models'

import {log, string, password} from '../../../utils'

// const {OrganizationType} = types
const {encryptPassword} = password
const {capitalize} = string

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

		// const address = await Address.create(addressPayload)
		const userId = new mongoose.Types.ObjectId()

		// const personalOrganization = await Organization.create({
		// 	name: capitalize(`${userPayload.first_name} ${userPayload.last_name} Personal Workspace`),
		// 	type: OrganizationType.Personal,
		// 	address: address?._id,
		// 	owner: userId
		// })

		// const organizations = [personalOrganization?._id]

		// if (organizationPayload) {
		// 	const {
		// 		address: orgAddressPayload,
		// 		...orgPayload
		// 	} = organizationPayload

			// let orgAddress

			// if (orgAddressPayload) {
			// 	orgAddress = await Address.create(orgAddressPayload)
			// }
			
			// const otherOrganization = await Organization.create({
			// 	...orgPayload,
			// 	address: orgAddress ? orgAddress?._id : address?._id,
			// 	owner: userId
			// })

			// organizations.push(otherOrganization?._id)
		// }

		const {hashedPassword, salt} = await encryptPassword(userPayload.password)

		await User.create({
			...userPayload,
			address: address?._id,
			// organizations,
			password: hashedPassword,
			salt,
			_id: userId
		})

		const user = await User.findById(userId)
			.populate(['address', 'organizations'])

		session.commitTransaction()
		session.endSession()

		// publish(eventTypes.USER_SIGNUP_SUCCEEDED, user)

		return {
			status_code: 200,
			data: user
		}
	} catch (error) {
		log.error(error)

		session.abortTransaction()
		session.endSession()

		// publish(eventTypes.USER_SIGNUP_FAILED, {error: error.message})

		return {status_code: 400, message: error.message}
	}
}


export default signup
