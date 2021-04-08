import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import eventDiskUtil from '../../utilities/eventDisk.utility'

export default class EventDiskUtilTest extends AbstractSpruceTest {
	@test()
	protected static async passesWithOptions() {
		const { eventName, version } = eventDiskUtil.splitPathToEvent(
			'src/events/event-name/v2020_01_01/event.options.ts'
		)
		assert.isEqual(eventName, 'event-name')
		assert.isEqual(version, 'v2020_01_01')
	}
}
