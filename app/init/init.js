import {eventBroker} from '@yachtly/finos-central-repo'

import loadExpress from './express'

export default async (app) => {
	await eventBroker.init()
	await loadExpress(app)
}
