import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import eventDiskUtil from '../../utilities/eventDisk.utility'

export default class SplittingPathsIntoEventTest extends AbstractSpruceTest {
	@test()
	protected static hasEventDiskUtils() {
		assert.isTruthy(eventDiskUtil)
	}

	@test()
	protected static throwsIfNotListener() {
		assert.doesThrow(() =>
			eventDiskUtil.splitPathToListener(
				this.resolvePath('src/listeners/my-great-event/test-event.listener.ts')
			)
		)

		assert.doesThrow(() =>
			eventDiskUtil.splitPathToListener(
				this.resolvePath('my-great-event/test-event.listener.ts')
			)
		)

		assert.doesThrow(() =>
			eventDiskUtil.splitPathToListener(
				this.resolvePath('my-great-event/v2020_02_02.listener.ts')
			)
		)

		assert.doesThrow(() =>
			eventDiskUtil.splitPathToListener(
				'/Volumes/RAMDisk/spruce-cli/16aa2e3a-d104-48de-a807-0804e87af9e1/src/listeners/MySkill1608771478325/v2020_12_23/my-fantastically-amazing-event/emitPayload.builder.ts'
			)
		)
	}

	@test()
	protected static throwsIfNotEvent() {
		assert.doesThrow(() =>
			eventDiskUtil.splitPathToEvent(
				this.resolvePath('src/events/my-great-event/emitPayload.builder.ts')
			)
		)

		assert.doesThrow(() =>
			eventDiskUtil.splitPathToEvent(
				'/Volumes/RAMDisk/spruce-cli/16aa2e3a-d104-48de-a807-0804e87af9e1/src/events/MySkill1608771478325/v2020_12_23/my-fantastically-amazing-event/permissions.contract.ts'
			)
		)
	}

	@test()
	protected static canEventPath() {
		const eventPath = this.resolvePath(
			'src/events/my-great-event/v2020_10_10/emitPayload.builder.ts'
		)

		assert.isEqualDeep(eventDiskUtil.splitPathToEvent(eventPath), {
			eventName: 'my-great-event',
			version: 'v2020_10_10',
		})
	}

	@test()
	protected static canListener() {
		const eventPath = this.resolvePath(
			'src/listeners/some-great-skill/v2020_10_10/did-book.listener.ts'
		)

		assert.isEqualDeep(eventDiskUtil.splitPathToListener(eventPath), {
			eventNamespace: 'some-great-skill',
			eventName: 'did-book',
			fullyQualifiedEventName: 'some-great-skill.did-book::v2020_10_10',
			version: 'v2020_10_10',
		})
	}

	@test()
	protected static throwsWhenResolvingBadListener() {
		assert.doesThrow(() =>
			//@ts-ignore
			eventDiskUtil.resolveListenerPath(this.cwd, {
				eventName: 'my-event',
				eventNamespace: 'test',
			})
		)
		assert.doesThrow(() =>
			//@ts-ignore
			eventDiskUtil.resolveListenerPath(this.cwd, {
				eventName: 'my-event',
				version: '123',
			})
		)

		assert.doesThrow(() =>
			//@ts-ignore
			eventDiskUtil.resolveListenerPath(this.cwd, {
				eventNamespace: 'test',
				version: '123',
			})
		)
	}

	@test()
	protected static throwsWhenResolvingBadEvent() {
		assert.doesThrow(() =>
			//@ts-ignore
			eventDiskUtil.resolveEventPath(this.cwd, {
				eventName: 'my-event',
			})
		)

		assert.doesThrow(() =>
			//@ts-ignore
			eventDiskUtil.resolveEventPath(this.cwd, {
				version: '123',
			})
		)
	}

	@test()
	protected static resolvesListenerAsExpected() {
		const e = {
			eventName: 'did-book',
			eventNamespace: 'booking',
			version: 'v2020_02_02',
		}

		const expected = this.resolvePath(
			`booking/v2020_02_02/did-book.listener.ts`
		)

		assert.isEqual(eventDiskUtil.resolveListenerPath(this.cwd, e), expected)
	}

	@test()
	protected static resolvesEventAsExpected() {
		const e = {
			eventName: 'did-book',
			version: 'v2020_02_02',
		}

		const expected = this.resolvePath(`did-book/v2020_02_02`)

		assert.isEqual(eventDiskUtil.resolveEventPath(this.cwd, e), expected)
	}
}
