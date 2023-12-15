import {model, Schema} from 'mongoose'

export const userSchema = new Schema(
	{
		first_name: {
			type: String
		},
		last_name: {
			type: String
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
			type: String
		},
		gender: {
			type: String
		},
		// address: {
		// 	type: Schema.Types.ObjectId,
		// 	ref: 'Address'
		// },
		// organizations: [{
		// 	type: Schema.Types.ObjectId,
		// 	ref: 'Organization'
		// }],
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
