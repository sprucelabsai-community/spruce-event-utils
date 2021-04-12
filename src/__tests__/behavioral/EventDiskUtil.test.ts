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

	@test('listener resolves with eventName', 'register-skill-views')
	@test(
		'listener resolves with eventName and namespace',
		'heartwood.register-skill-views'
	)
	@test(
		'listener resolves with eventName and version',
		'register-skill-views::v2020_01_01'
	)
	@test(
		'listener resolves with eventName, namespace and version',
		'heartwood.register-skill-views::v2020_01_01'
	)
	protected static async resolveListenerAsExpected(eventName: string) {
		const resolvedDestination = eventDiskUtil.resolveListenerPath(this.cwd, {
			eventName,
			eventNamespace: 'heartwood',
			version: 'v2020_01_01',
		})

		assert.isEqual(
			resolvedDestination,
			this.resolvePath('heartwood/register-skill-views.v2020_01_01.listener.ts')
		)
	}
}
