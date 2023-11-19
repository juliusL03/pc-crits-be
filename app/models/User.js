import {model, Schema} from 'mongoose'

export const userSchema = new Schema(
	{
		first_name: {
			type: String,
			required: [true, 'Field `first_name` is required']
		},
		last_name: {
			type: String,
			required: [true, 'Field `last_name` is required']
		},
		email: {
			type: String,
			required: [true, 'Field `email` is required']
		},
		email_verified: {
			type: Boolean,
			required: [true, 'Field `email_verified` is required'],
			default: false
		},
		age: {
			type: String,
			required: [true, 'Field `age` is required']
		},
		gender: {
			type: String,
			required: [true, 'Field `gender` is required'],
			enum: ['Male', 'Female']
		},
		address: {
			type: Schema.Types.ObjectId,
			ref: 'Address'
		},
		organizations: [{
			type: Schema.Types.ObjectId,
			ref: 'Organization'
		}],
		password: {
			type: String,
			required: [true, 'Field `password` is required']
		},
		salt: {
			type: String,
			required: [true, 'Field `salt` is required']
		},
		password_reset_token: {
			type: String
		},
		metadata: {
			type: Object
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
)

export default model('User', userSchema)
