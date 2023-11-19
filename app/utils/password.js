import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

export const encryptPassword = async (password) => {
	const salt = bcrypt.genSaltSync(SALT_ROUNDS)
	const hashedPassword = bcrypt.hashSync(password, salt)
	
	return {hashedPassword, salt}
}

export const decryptPassword = async (plain, hash) => bcrypt.compareSync(plain, hash)
