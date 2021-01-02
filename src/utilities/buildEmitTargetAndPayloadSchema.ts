import { buildSchema, Schema, SchemaValues } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'

export const eventTargetSchema = buildSchema({
	id: 'eventTarget',
	fields: {
		locationId: {
			type: 'id',
		},
		personId: {
			type: 'id',
		},
		organizationId: {
			type: 'id',
		},
		skillSlug: {
			type: 'id',
		},
	},
})

export type EventTargetSchema = typeof eventTargetSchema
export type EventTarget = SchemaValues<EventTargetSchema>

type TargetAndPayload<PayloadSchema extends Schema> = {
	id: string
	fields: {
		target: {
			type: 'schema'
			isRequired: true
			options: {
				schema: EventTargetSchema
			}
		}
		payload: {
			type: 'schema'
			options: {
				schema: PayloadSchema
			}
		}
	}
}

function buildEmitTargetAndPayloadSchema<T extends Schema>(options: {
	eventName: string
	emitPayloadSchema?: T
}): TargetAndPayload<T> {
	const { eventName, emitPayloadSchema } = options

	const schema = {
		id: `${namesUtil.toCamel(eventName)}EmitTargetAndPayload`,
		fields: {
			target: {
				type: 'schema',
				isRequired: true,
				options: {
					schema: eventTargetSchema,
				},
			},
		},
	}

	const hasPayloadFields =
		emitPayloadSchema && Object.keys(emitPayloadSchema.fields ?? {}).length > 0
	if (hasPayloadFields) {
		//@ts-ignore
		schema.fields.payload = {
			type: 'schema',
			isRequired: true,
			options: {
				schema: emitPayloadSchema,
			},
		}
	}

	return schema as TargetAndPayload<T>
}

export default buildEmitTargetAndPayloadSchema
