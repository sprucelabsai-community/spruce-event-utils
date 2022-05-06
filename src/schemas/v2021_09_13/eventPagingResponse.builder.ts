import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'eventPagingResponse',
	name: 'eventPagingResponse',
	fields: {
		cursorId: {
			type: 'id',
			isRequired: true,
		},
	},
})
