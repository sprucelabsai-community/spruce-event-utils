import { Schema, SchemaValues, AreAnyFieldsRequired } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import eventSourceSchema from '#spruce/schemas/spruceEventUtils/v2021_09_13/eventSource.schema'
import eventTargetSchema from '#spruce/schemas/spruceEventUtils/v2021_09_13/eventTarget.schema'

export type EventTargetSchema = typeof eventTargetSchema
export type EventTarget = SchemaValues<EventTargetSchema>
export type EventSourceSchema = typeof eventSourceSchema
export type EventSource = SpruceSchemas.SpruceEventUtils.v2021_09_13.EventSource

export type TargetAndPayload<
	TargetSchema extends Schema | undefined,
	PayloadSchema extends Schema | undefined
> = {
	id: string
	fields: Omit<
		{
			source: {
				type: 'schema'
				isRequired: false
				options: {
					schema: EventSourceSchema
				}
			}
			target: {
				type: 'schema'
				isRequired: AreAnyFieldsRequired<TargetSchema>
				options: {
					schema: TargetSchema
				}
			}
			payload: {
				type: 'schema'
				isRequired: AreAnyFieldsRequired<PayloadSchema>
				options: {
					schema: PayloadSchema
				}
			}
		},
		| (TargetSchema extends undefined ? 'target' : '')
		| (PayloadSchema extends undefined ? 'payload' : '')
	>
}

function buildEmitTargetAndPayloadSchema<
	Payload extends Schema,
	Target extends Schema
>(options: {
	eventName: string
	payloadSchema?: Payload
	targetSchema?: Target
}): TargetAndPayload<Target, Payload> {
	const { eventName, payloadSchema: emitPayloadSchema, targetSchema } = options

	const targetField = {
		type: 'schema',
		isRequired: hasAnyRequiredFields(targetSchema),
		options: {
			schema: targetSchema,
		},
	}

	const schema = {
		id: `${namesUtil.toCamel(eventName)}EmitTargetAndPayload`,
		fields: {
			source: {
				type: 'schema',
				label: 'Source',
				options: {
					schema: eventSourceSchema,
				},
			},
		},
	}

	const hasTargetFields =
		targetSchema && Object.keys(targetSchema.fields ?? {}).length > 0

	if (hasTargetFields) {
		//@ts-ignore
		schema.fields.target = targetField
	}

	const hasPayloadFields =
		emitPayloadSchema && Object.keys(emitPayloadSchema.fields ?? {}).length > 0

	if (hasPayloadFields) {
		const isRequired = hasAnyRequiredFields<Payload>(emitPayloadSchema)

		//@ts-ignore
		schema.fields.payload = {
			type: 'schema',
			isRequired,
			options: {
				schema: emitPayloadSchema,
			},
		}
	}

	return schema as any
}

export default buildEmitTargetAndPayloadSchema
function hasAnyRequiredFields<S extends Schema>(schema: S | undefined) {
	return !!Object.keys(schema?.fields ?? {}).find(
		(f) => schema?.fields?.[f].isRequired
	)
}
