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
	protected static canJoinEventName() {
		const name = eventNameUtil.join({
			eventNamespace: 'test',
			eventName: 'event',
		})
		assert.isEqual(name, 'test.event')
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
}
