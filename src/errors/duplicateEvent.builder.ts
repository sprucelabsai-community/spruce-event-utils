import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'duplicateEvent',
	name: 'Duplicate event',
	description: '',
	fields: {
		eventNameWithOptionalNamespace: {
			type: 'text',
		},
	},
})
