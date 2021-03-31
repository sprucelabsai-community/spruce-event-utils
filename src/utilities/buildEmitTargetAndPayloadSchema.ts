import { dropFields, Schema, SchemaValues } from '@sprucelabs/schema'
import { messageTargetSchema } from '@sprucelabs/spruce-core-schemas'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'

export const eventTargetSchema = {
	id: 'eventTarget',
	fields: {
		...dropFields(messageTargetSchema.fields, ['phone']),
	},
}

export type EventTargetSchema = typeof eventTargetSchema
export type EventTarget = SchemaValues<EventTargetSchema>

type TargetAndPayload<
	PayloadSchema extends Schema,
	IsTargetRequired extends boolean = true
> = {
	id: string
	fields: {
		target: {
			type: 'schema'
			isRequired: IsTargetRequired
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

function buildEmitTargetAndPayloadSchema<
	T extends Schema,
	IsTargetRequired extends boolean = true
>(options: {
	eventName: string
	emitPayloadSchema?: T
	shouldRequireTarget?: IsTargetRequired
}): TargetAndPayload<T, IsTargetRequired> {
	const { eventName, emitPayloadSchema, shouldRequireTarget = true } = options

	const schema = {
		id: `${namesUtil.toCamel(eventName)}EmitTargetAndPayload`,
		fields: {
			target: {
				type: 'schema',
				isRequired: shouldRequireTarget,
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

	return schema as any
}

export default buildEmitTargetAndPayloadSchema
