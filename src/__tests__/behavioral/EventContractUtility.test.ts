import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import eventContractUtil from '../../utilities/eventContract.utility'

export default class EventContractUtilityTest extends AbstractSpruceTest {
	@test()
	protected static canParseEventName() {
		const nameParts = eventContractUtil.splitEventNameWithOptionalNamespace(
			'test.event'
		)
		assert.isEqualDeep(nameParts, {
			eventName: 'event',
			eventNamespace: 'test',
		})
	}

	@test()
	protected static canParseEventNameWithVersion() {
		const nameParts = eventContractUtil.splitEventNameWithOptionalNamespace(
			'test.event::v2020_02_02'
		)
		assert.isEqualDeep(nameParts, {
			eventName: 'event',
			eventNamespace: 'test',
			version: 'v2020_02_02',
		})
	}

	@test()
	protected static canJoinEventName() {
		const name = eventContractUtil.joinEventNameWithOptionalNamespace({
			eventNamespace: 'test',
			eventName: 'event',
		})
		assert.isEqual(name, 'test.event')
	}

	@test()
	protected static canJoinEventNameWithVersion() {
		const name = eventContractUtil.joinEventNameWithOptionalNamespace({
			eventName: 'event',
			version: 'v2020_02_02',
		})

		assert.isEqual(name, 'event::v2020_02_02')
	}

	@test()
	protected static canJoinEventNameWithVersionAndNamespace() {
		const name = eventContractUtil.joinEventNameWithOptionalNamespace({
			eventNamespace: 'test',
			eventName: 'event',
			version: 'v2020_02_02',
		})

		assert.isEqual(name, 'test.event::v2020_02_02')
	}

	@test()
	protected static noVersionResolvesToVersion() {
		const sig = eventContractUtil.getSignatureByName(
			{
				eventSignatures: {
					'book-appointment::v1': {},
				},
			},
			//@ts-ignore
			'book-appointment'
		)

		assert.isTruthy(sig)
	}

	@test()
	protected static noVersionResolvesToLatestVersion() {
		const sig = eventContractUtil.getSignatureByName(
			{
				eventSignatures: {
					'book-appointment::v1': {},
					'book-appointment::v3': {},
					'book-appointment::v5': {
						emitPayloadSchema: {
							id: 'test',
							fields: {},
						},
					},
					'book-appointment::v4': {},
				},
			},
			//@ts-ignore
			'book-appointment'
		)

		assert.isTruthy(sig.emitPayloadSchema)
	}

	@test()
	protected static unifyingNoontractsWithNoEventsYieldsUndefined() {
		assert.isUndefined(eventContractUtil.unifyContracts([]))
	}

	@test()
	protected static unifyingContractsJoinsEvents() {
		const contract = eventContractUtil.unifyContracts([
			{
				eventSignatures: { 'good-event::1': {} },
			},
			{
				eventSignatures: { 'another-good-event::1': {} },
			},
		])

		assert.isTruthy(contract?.eventSignatures['good-event::1'])
		assert.isTruthy(contract?.eventSignatures['another-good-event::1'])
	}

	@test()
	protected static unifyingCatchesDups() {
		const err = assert.doesThrow(() =>
			eventContractUtil.unifyContracts([
				{
					eventSignatures: { 'good-event::1': {} },
				},
				{
					eventSignatures: { 'good-event::1': {} },
				},
			])
		)

		errorAssertUtil.assertError(err, 'DUPLICATE_EVENT', {
			eventNameWithOptionalNamespace: 'good-event::1',
		})
	}

	@test()
	protected static catchesDuplicatesWithManyContracts() {
		const err = assert.doesThrow(() =>
			eventContractUtil.unifyContracts([
				{
					eventSignatures: { 'good-event::1': {}, 'good-event::2': {} },
				},
				{
					eventSignatures: { 'good-event::3': {}, 'good-event::4': {} },
				},
				{
					eventSignatures: { 'good-event::3': {} },
				},
			])
		)

		errorAssertUtil.assertError(err, 'DUPLICATE_EVENT', {
			eventNameWithOptionalNamespace: 'good-event::3',
		})
	}

	@test(
		'can generate response name from event',
		'test-event',
		'test-event:response'
	)
	@test(
		'can generate response name from event with namespace',
		'test.event',
		'test.event:response'
	)
	@test(
		'can generate response name from event with version',
		'test-event::v2020_02_01',
		'test-event:response::v2020_02_01'
	)
	@test(
		'can generate response name from event with namespace with version',
		'test.event::v2020_02_01',
		'test.event:response::v2020_02_01'
	)
	protected static canGenerateResponseEventName(
		eventName: string,
		expected: string
	) {
		const actual = eventContractUtil.generateResponseEventName(eventName)
		assert.isEqual(actual, expected)
	}
}
