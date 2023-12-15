import session from 'express-session'
import MongoStore from 'connect-mongo'
import i18next from './i18n'

export const applySession = async (app) => {

const storeSession = MongoStore.create({
 mongoUrl: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
 dbName: process.env.DB_NAME,
 collectionName: 'mySessions',
 ttl: 114*24*60*68,
 autoRemove: "native"
})

	app.use(
		session({
			name: 'pcCrits.sid',
			store: null,
			secret: process.env.SESSION_SECRET,
   store: storeSession,
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: !process.env.WEB_APP_BASE_URL.includes('localhost'),
				maxAge: 1000 * 60 * 60 * 24
			}
		})
	)
}

export const protectRoute = (req, res, next) => {
	if (req.session?.authenticated) {
		return next()
	}
	return res.status(401).send(i18next.t('unauthorized_user'))
}
