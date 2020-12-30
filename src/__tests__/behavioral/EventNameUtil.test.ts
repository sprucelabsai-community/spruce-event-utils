import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import eventNameUtil from '../../utilities/eventName.utility'

export default class EventNameUtil extends AbstractSpruceTest {
	@test()
	protected static canParseEventName() {
		const nameParts = eventNameUtil.split('test.event')
		assert.isEqualDeep(nameParts, {
			eventName: 'event',
			eventNamespace: 'test',
		})
	}

	@test()
	protected static canParseEventNameWithVersion() {
		const nameParts = eventNameUtil.split('test.event::v2020_02_02')
		assert.isEqualDeep(nameParts, {
			eventName: 'event',
			eventNamespace: 'test',
			version: 'v2020_02_02',
		})
	}

	@test()
	protected static canJoinEventNameWithVersion() {
		const name = eventNameUtil.join({
			eventName: 'event',
			version: 'v2020_02_02',
		})

		assert.isEqual(name, 'event::v2020_02_02')
	}

	@test()
	protected static canJoinEventNameWithVersionAndNamespace() {
		const name = eventNameUtil.join({
			eventNamespace: 'test',
			eventName: 'event',
			version: 'v2020_02_02',
		})

		assert.isEqual(name, 'test.event::v2020_02_02')
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
		const actual = eventNameUtil.generateResponseEventName(eventName)
		assert.isEqual(actual, expected)
	}
}
