import BaseSpruceError from '@sprucelabs/error'
import ErrorOptions from '#spruce/errors/options.types'

export default class SpruceError extends BaseSpruceError<ErrorOptions> {
	/** An easy to understand version of the errors */
	public friendlyMessage(): string {
		const { options } = this
		let message
		switch (options?.code) {
			case 'INVALID_EVENT_NAME':
				message = `I couldn't find an event called ${options.fullyQualifiedEventName}.`
				break

			case 'MERCURY_RESPONSE_ERROR': {
				const errors = options.responseErrors
				message = `Got ${
					errors.length === 1 ? 'an error' : `${errors.length} errors`
				} from the server:\n\n`

				const errorMessages: string[] = []
				for (const err of errors) {
					errorMessages.push(err.options?.friendlyMessage ?? err.message)
				}

				message += errorMessages.join('\n')

				break
			}

			case 'EMPTY_MERCURY_RESPONSE':
				return "Got no results back from the server! That was unexpected. It may be because the event you're listening to does not have a response payload."

			case 'DUPLICATE_EVENT':
				message = `'${options.fullyQualifiedEventName}' event already exists.`
				break

			case 'EVENT_PLUGIN_ERROR':
				message = 'A event plugin error just happened!'
				break

			default:
				message = super.friendlyMessage()
		}

		const fullMessage = `${message}${
			options.friendlyMessage && options.friendlyMessage !== message
				? `\n\n${options.friendlyMessage}`
				: ''
		}`

		return fullMessage
	}
}
