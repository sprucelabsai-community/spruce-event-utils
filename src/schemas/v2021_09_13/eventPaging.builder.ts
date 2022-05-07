import { buildSchema } from '@sprucelabs/schema'

const sortSchema = buildSchema({
	id: 'eventPagingSort',
	moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
	importsWhenRemote: ["import '@sprucelabs/spruce-event-utils'"],
	fields: {
		field: {
			type: 'id',
			isRequired: true,
		},
		direction: {
			type: 'select',
			options: {
				choices: [
					{
						value: 'asc',
						label: 'Ascending',
					},
					{
						value: 'desc',
						label: 'Descending',
					},
				],
			},
		},
	},
})

export default buildSchema({
	id: 'eventPaging',
	name: 'Event Paging',
	moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
	importsWhenRemote: ["import '@sprucelabs/spruce-event-utils'"],
	fields: {
		pageSize: {
			type: 'number',
		},
		cursorId: {
			type: 'id',
		},
		sort: {
			type: 'schema',
			isArray: true,
			options: {
				schema: sortSchema,
			},
		},
	},
})
