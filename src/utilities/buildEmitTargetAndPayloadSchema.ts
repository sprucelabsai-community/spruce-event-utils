import { buildSchema, Schema, SchemaValues } from '@sprucelabs/schema'

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

function buildEmitTargetAndPayloadSchema<T extends Schema>(
	payloadSchema: T
): TargetAndPayload<T> {
	const schema = buildSchema({
		id: `${payloadSchema.id}TargetAndPayload`,
		fields: {
			target: {
				type: 'schema',
				isRequired: true,
				options: {
					schema: eventTargetSchema,
				},
			},
		},
	})

	const hasPayloadFields = Object.keys(payloadSchema.fields ?? {}).length > 0
	if (hasPayloadFields) {
		//@ts-ignore
		schema.fields.payload = {
			type: 'schema',
			isRequired: true,
			options: {
				schema: payloadSchema,
			},
		}
	}

	return schema as TargetAndPayload<T>
}

export default buildEmitTargetAndPayloadSchema
