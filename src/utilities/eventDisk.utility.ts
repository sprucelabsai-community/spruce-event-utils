import eventNameUtil from './eventName.utility'

interface Event {
	eventName: string
	version: string
}

interface Listener {
	eventName: string
	eventNamespace: string
	fullyQualifiedEventName: string
	version: string
}

const eventDiskUtil = {
	resolveListenerPath(
		destination: string,
		e: { eventNamespace: string; eventName: string; version: string },
		seperator = '/'
	) {
		if (!e || !e.eventName || !e.eventNamespace || !e.version) {
			throw new Error(
				"Can't resolve path to listener without eventName, eventNamespace, version"
			)
		}

		return [
			destination,
			e.eventNamespace,
			e.eventName + '.' + e.version + '.listener.ts',
		].join(seperator)
	},

	splitPathToListener(match: string, seperator = '/'): Listener {
		const matches = new RegExp(
			`([a-z\\-]+)\\${seperator}([a-z\\-]+)\\.(v[0-9]{4}_[0-9]{2}_[0-9]{2})\\.listener.ts`
		).exec(match)

		if (!matches) {
			throw new Error(
				"Invalid listener path. Must be in a folder structure like '**/src/listeners/{{eventNamespace}}/{{eventName}}.{{version}}.listener.ts"
			)
		}

		const listener: any = {}

		listener.eventNamespace = matches[1]
		listener.version = matches[3]
		listener.eventName = matches[2]
		listener.fullyQualifiedEventName = eventNameUtil.join({
			eventName: listener.eventName,
			eventNamespace: listener.eventNamespace,
			version: listener.version,
		})

		return listener
	},
	splitPathToEvent(match: string, seperator = '/'): Event {
		const matches = new RegExp(
			`([a-z\\-]*)\\${seperator}(v[0-9]{4}_[0-9]{2}_[0-9]{2})\\${seperator}.*?\\.builder\\.ts`
		).exec(match)

		if (!matches) {
			throw new Error(
				"Invalid event path. Must be in a folder structure like '**/src/events/{{eventName}}/{{version}}/emitPayloadSchema.builder.ts"
			)
		}

		const event: any = {}

		event.eventName = matches[1]
		event.version = matches[2]

		if (!event.eventName || !event.version) {
			throw new Error(
				"Invalid event path. Must be in a folder structure like '**/src/events/{{eventName}}/{{version}}/emitPayloadSchema.builder.ts"
			)
		}

		return event
	},
	resolveEventPath(
		destination: string,
		fileName:
			| 'emitPayload.builder.ts'
			| 'responsePayload.builder.ts'
			| 'emitPermissions.builder.ts'
			| 'listenPermissions.builder.ts',
		e: { eventName: string; version: string },
		seperator = '/'
	) {
		if (!e || !e.eventName || !e.version) {
			throw new Error(
				"Can't resolve path to event without eventName, eventNamespace, version"
			)
		}
		e
		return [destination, e.eventName, e.version, fileName].join(seperator)
	},
}

export default eventDiskUtil
