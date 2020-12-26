import { EventSignature } from '@sprucelabs/mercury-types'
import { EVENT_VERSION_DIVIDER } from '../constants'

export interface NamedEventSignature {
	eventNameWithOptionalNamespace: string
	eventName: string
	eventNamespace?: string
	version?: string
	signature: EventSignature
}

const eventNameUtil = {
	split(
		name: string
	): { eventName: string; eventNamespace?: string; version?: string } {
		const versionParts = name.split('::')
		const eventNameWithOptionalNamespace = versionParts[0]
		const version = versionParts[1]

		const parts = eventNameWithOptionalNamespace.split('.')
		const eventNamespace = parts[1] ? parts[0] : undefined
		const eventName = parts[1] || parts[0]

		const e: any = {
			eventName,
		}

		if (eventNamespace) {
			e.eventNamespace = eventNamespace
		}

		if (version) {
			e.version = version
		}

		return e
	},

	join(options: {
		eventName: string
		eventNamespace?: string
		version?: string
	}): string {
		const { eventName, eventNamespace, version } = options

		function optionallyAttachversion(name: string) {
			if (version) {
				return name + EVENT_VERSION_DIVIDER + version
			}
			return name
		}

		if (!eventNamespace) {
			return optionallyAttachversion(eventName)
		}

		let eventNameWithOptionalNamespace = !eventNamespace
			? eventName
			: `${eventNamespace}.${eventName}`

		eventNameWithOptionalNamespace = optionallyAttachversion(
			eventNameWithOptionalNamespace
		)

		return eventNameWithOptionalNamespace
	},
}

export default eventNameUtil
