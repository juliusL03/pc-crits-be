import {connect as connectDb, disconnect as disconnectDb, set} from 'mongoose'

import UserModel from './User'

set('strictQuery', true)

export const User = UserModel
// export const Address = AddressModel
// export const Organization = OrganizationModel

export const connect = async () => {
	await connectDb(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`)
}

export const disconnect = async () => disconnectDb()
