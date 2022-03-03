import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'eventPaging',
	name: 'Event Paging',
	fields: {
		pageSize: {
			type: 'number',
		},
	},
})
