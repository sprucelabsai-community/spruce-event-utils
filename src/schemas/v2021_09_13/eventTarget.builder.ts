import { buildSchema, dropFields } from '@sprucelabs/schema'
import { messageTargetSchema } from '@sprucelabs/spruce-core-schemas'

export default buildSchema({
	id: 'eventTarget',
	name: 'event target',
	fields: {
		...dropFields(messageTargetSchema.fields, ['phone']),
	},
})
