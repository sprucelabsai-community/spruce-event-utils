import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'eventPaging',
	name: 'Event Paging',
	moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
	importsWhenRemote: ["import '@sprucelabs/spruce-event-utils'"],
	fields: {
		pageSize: {
			type: 'number',
		},
	},
})
