import { buildSchema } from '@sprucelabs/schema'
import eventTargetBuilder from './eventTarget.builder'

export default buildSchema({
	id: 'eventSource',
	name: 'event source',
	moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
	importsWhenRemote: ["import '@sprucelabs/spruce-event-utils'"],
	fields: {
		...eventTargetBuilder.fields,
		proxyToken: {
			type: 'id',
			label: 'Proxy token',
		},
	},
})
