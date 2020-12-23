import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import eventDiskUtil from '../../utilities/eventDiskUtil.utility'

export default class SplittingPathsIntoEventTest extends AbstractSpruceTest {
	@test()
	protected static hasEventDiskUtils() {
		assert.isTruthy(eventDiskUtil)
	}

	@test()
	protected static canEventPath() {
		const eventPath = this.resolvePath(
			'/src/events/v2020_10_10/my-great-event/emitPayload.builder.ts'
		)

		assert.isEqualDeep(eventDiskUtil.splitPathToEvent(eventPath), {
			isEvent: true,
			eventName: 'my-great-event',
			version: 'v2020_10_10',
		})
	}

	@test()
	protected static canEventListener() {
		const eventPath = this.resolvePath(
			'/src/listeners/some-great-skill/v2020_10_10/did-book.listener.ts'
		)

		assert.isEqualDeep(eventDiskUtil.splitPathToEvent(eventPath), {
			isListener: true,
			eventNamespace: 'some-great-skill',
			eventName: 'did-book',
			eventNameWithOptionalNamespace: 'some-great-skill.did-book',
			version: 'v2020_10_10',
		})
	}
}
