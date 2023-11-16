import session from 'express-session'
// import RedisStore from 'connect-redis'
// import redis from 'redis'
import i18next from './i18n'

export const applySession = async (app) => {
	// const redisClient = redis.createClient({url: `redis://${process.env.REDIS_HOST}`})
	// redisClient.connect()
	// const redisStore = new RedisStore({client: redisClient, prefix: 'finos.'})
	app.use(
		session({
			name: 'pcCrits.sid',
			store: null,
			secret: process.env.SESSION_SECRET,
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
