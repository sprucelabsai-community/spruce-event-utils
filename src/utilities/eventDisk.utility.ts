import pathUtil from 'path'
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

		const fqen = eventNameUtil.join(e)
		const { eventName, eventNamespace, version } = eventNameUtil.split(fqen)

		return [
			destination,
			eventNamespace,
			eventName + '.' + version + '.listener.ts',
		].join(seperator)
	},

	splitPathToListener(match: string, seperator = '/'): Listener {
		const matches = new RegExp(
			`([a-z0-9\\-]+)\\${seperator}([a-z0-9\\-]+)\\.(v[0-9]{4}_[0-9]{2}_[0-9]{2})\\.listener.[t|j]s`
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
			`([a-z0-9\\-]*)\\${seperator}(v[0-9]{4}_[0-9]{2}_[0-9]{2})\\${seperator}.*?\\.(builder|options)\\.[j|t]s`
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
		e: {
			fileName:
				| 'emitPayload.builder.ts'
				| 'responsePayload.builder.ts'
				| 'emitPermissions.builder.ts'
				| 'listenPermissions.builder.ts'
			eventName: string
			version: string
		}
	) {
		if (!e || !e.eventName || !e.version) {
			throw new Error(
				"Can't resolve path to event without eventName, eventNamespace, version"
			)
		}

		return pathUtil.join(destination, e.eventName, e.version, e.fileName)
	},
}

export default eventDiskUtil
