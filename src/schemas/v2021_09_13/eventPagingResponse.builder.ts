import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'eventPagingResponse',
	name: 'eventPagingResponse',
	moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
	importsWhenRemote: ["import '@sprucelabs/spruce-event-utils'"],
	fields: {
		cursorId: {
			type: 'id',
			isRequired: true,
		},
	},
})
