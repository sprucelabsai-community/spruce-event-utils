import {
	dropFields,
	Schema,
	SchemaRequiredFieldNames,
	SchemaValues,
} from '@sprucelabs/schema'
import { messageTargetSchema } from '@sprucelabs/spruce-core-schemas'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'

export const eventTargetSchema = {
	id: 'eventTarget',
	fields: {
		...dropFields(messageTargetSchema.fields, ['phone']),
	},
}

export const eventSourceSchema = eventTargetSchema

export type EventTargetSchema = typeof eventTargetSchema
export type EventTarget = SchemaValues<EventTargetSchema>
export type EventSource = EventTarget

type AreAnyFieldsRequired<S extends Schema | undefined> = S extends Schema
	? SchemaRequiredFieldNames<S> extends []
		? false
		: true
	: false

export type TargetAndPayload<
	TargetSchema extends Schema | undefined,
	PayloadSchema extends Schema | undefined
> = {
	id: string
	fields: Omit<
		{
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
		fields: {},
	}

	if (targetSchema) {
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
