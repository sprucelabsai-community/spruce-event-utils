import eventContractUtil from './eventContract.utility'

interface Event {
	eventName: string
	isEvent: true
	version: string
}

interface Listener {
	eventName: string
	eventNamespace: string
	eventNameWithOptionalNamespace: string
	isListener: true
	version: string
}

const eventDiskUtil = {
	splitPathToEvent(match: string, seperator = '/'): Event | Listener {
		const matchParts = match.split(seperator)
		const isEvent = match.search(`${seperator}events${seperator}`) > -1

		const event: any = {}

		if (isEvent) {
			matchParts.pop()
			event.isEvent = true
			event.eventName = matchParts.pop() ?? ''
			event.version = matchParts.pop() as string
		} else {
			event.isListener = true
			event.eventName = matchParts.pop()?.split('.')[0] as string
			event.version = matchParts.pop() as string
			event.eventNamespace = matchParts.pop() as string
			event.eventNameWithOptionalNamespace = eventContractUtil.joinEventNameWithOptionalNamespace(
				{
					eventName: event.eventName,
					eventNamespace: event.eventNamespace,
				}
			)
		}

		return event
	},
}

export default eventDiskUtil
