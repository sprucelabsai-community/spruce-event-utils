import { EVENT_VERSION_DIVIDER } from '../constants'

const eventNameUtil = {
	split(name: string): {
		eventName: string
		eventNamespace?: string
		version?: string
	} {
		const versionParts = name.split('::')
		const fullyQualifiedEventName = versionParts[0]
		const version = versionParts[1]

		const parts = fullyQualifiedEventName.split('.')
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
		const {
			eventName: eventNameOptions,
			eventNamespace: eventNamespaceOptions,
			version: versionOptions,
		} = options

		let { eventName, eventNamespace, version } = this.split(eventNameOptions)

		eventNamespace = eventNamespaceOptions ?? eventNamespace
		version = versionOptions ?? version

		function optionallyAttachversion(name: string) {
			if (version) {
				return name + EVENT_VERSION_DIVIDER + version
			}
			return name
		}

		if (!eventNamespace) {
			return optionallyAttachversion(eventName)
		}

		let fullyQualifiedEventName = !eventNamespace
			? eventName
			: `${eventNamespace}.${eventName.replace(eventNamespace + '.', '')}`

		fullyQualifiedEventName = optionallyAttachversion(fullyQualifiedEventName)

		return fullyQualifiedEventName
	},

	generateResponseEventName(fullyQualifiedEventName: string) {
		const { eventName, eventNamespace, version } = this.split(
			fullyQualifiedEventName
		)

		let name = `${this.join({
			eventNamespace,
			eventName,
			version: '',
		})}:response`

		if (version) {
			name += '::' + version
		}

		return name
	},
}

export default eventNameUtil
