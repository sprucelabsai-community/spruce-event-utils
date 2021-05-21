import { buildSchema, SchemaRegistry, SchemaValues } from '@sprucelabs/schema'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import buildEmitTargetPayloadSchema from '../../utilities/buildEmitTargetAndPayloadSchema'

export default class BuildEmitTargetAndPayloadSchemaTest extends AbstractSpruceTest {
	protected static async beforeEach() {
		await super.beforeEach()
		SchemaRegistry.getInstance().forgetAllSchemas()
	}

	@test()
	protected static builderExists() {
		assert.isFunction(buildEmitTargetPayloadSchema)
	}

	@test()
	protected static builderAddsInOptionalTarget() {
		const schema = buildEmitTargetPayloadSchema({
			eventName: 'did-book',
			payloadSchema: {
				id: 'emitPayload',
				fields: {
					textField: {
						type: 'text',
					},
				},
			},
		})

		assert.isEqual(schema.id, 'didBookEmitTargetAndPayload')
		assert.isFalsy(schema.fields.target)
		assert.isTruthy(schema.fields.payload)
		assert.isTruthy(schema.fields.payload.options.schema.id, 'emitPayload')
	}

	@test()
	protected static buildsWithoutPayloadForNoFields() {
		const schema = buildEmitTargetPayloadSchema({
			eventName: 'did-book',
			payloadSchema: {
				id: 'emitPayload',
				fields: {},
			},
		})

		assert.isFalsy(schema.fields.target)
		assert.isFalsy(schema.fields.payload)
	}

	@test()
	protected static payloadOptionalIfAllFieldsAreOptional() {
		const schema = buildEmitTargetPayloadSchema({
			eventName: 'did-book',
			payloadSchema: {
				id: 'emitPayload',
				fields: {
					firstName: {
						type: 'text',
					},
				},
			},
		})

		assert.isFalse(schema.fields.payload.isRequired)
	}

	@test()
	protected static buildsWithoutPayload() {
		const schema = buildEmitTargetPayloadSchema({ eventName: 'did-book' })
		//@ts-ignore
		assert.isEqualDeep(schema.fields, {})
	}

	@test()
	protected static buildsOverAndOverWithoutErroring() {
		buildEmitTargetPayloadSchema({ eventName: 'did-book' })
		const schema = buildEmitTargetPayloadSchema({ eventName: 'did-book' })
		//@ts-ignore
		assert.isEqualDeep(schema.fields, {})
	}

	@test('tests typing (tests always pass, types will fail)')
	protected static typesTarget() {
		const schema = buildEmitTargetPayloadSchema({
			eventName: 'will-book',
			payloadSchema: {
				id: 'emitPayload',
				fields: {
					textField: {
						type: 'text',
					},
				},
			},
		})

		type TargetAndPayload = SchemaValues<typeof schema>
		const target: TargetAndPayload['target'] = {
			organizationId: 'true',
		}

		assert.isTruthy(target)

		const payload: TargetAndPayload['payload'] = {
			textField: 'hey',
		}

		assert.isTruthy(payload)
	}

	@test()
	protected static targetOptionalIfNoRequiredFields() {
		const schema = buildEmitTargetPayloadSchema({
			targetSchema: {
				id: 'emitTarget',
				fields: {
					textField: {
						type: 'text',
					},
				},
			},
			eventName: 'will-book',
			payloadSchema: {
				id: 'emitPayload',
				fields: {
					textField: {
						type: 'text',
					},
				},
			},
		})

		assert.isFalse(schema.fields.target.isRequired)
		type Schema = typeof schema

		assert.isExactType<false, Schema['fields']['target']['isRequired']>(true)
		assert.isExactType<false, Schema['fields']['payload']['isRequired']>(true)
	}

	@test()
	protected static targetGoneIfNoFields() {
		const schema = buildEmitTargetPayloadSchema({
			targetSchema: {
				id: 'emitTarget',
				fields: {},
			},
			eventName: 'will-book',
			payloadSchema: {
				id: 'emitPayload',
				fields: {
					textField: {
						type: 'text',
					},
				},
			},
		})

		assert.isFalsy(schema.fields.target)
	}

	@test()
	protected static canCustomizeTarget() {
		const targetSchema = buildSchema({
			id: 'emitTarget',
			fields: {
				textField: {
					type: 'text',
					isRequired: true,
				},
			},
		})

		const schema = buildEmitTargetPayloadSchema({
			eventName: 'will-book',
			targetSchema,
			payloadSchema: {
				id: 'emitPayload',
				fields: {
					textField: {
						type: 'text',
						isRequired: true,
					},
				},
			},
		})

		type Schema = typeof schema
		assert.isTrue(schema.fields.target.isRequired)
		assert.isEqualDeep(schema.fields.target.options.schema, targetSchema)

		assert.isExactType<true, Schema['fields']['target']['isRequired']>(true)
		assert.isExactType<true, Schema['fields']['payload']['isRequired']>(true)
	}
}
