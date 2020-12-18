import { SpruceErrors } from "#spruce/errors/errors.types"
import { SpruceErrorOptions, ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"
import { SchemaErrorOptions } from '@sprucelabs/schema'

export interface MercuryResponseErrorErrorOptions extends SpruceErrors.SpruceEventUtils.MercuryResponseError, ISpruceErrorOptions {
	code: 'MERCURY_RESPONSE_ERROR'
}
export interface InvalidEventNameErrorOptions extends SpruceErrors.SpruceEventUtils.InvalidEventName, ISpruceErrorOptions {
	code: 'INVALID_EVENT_NAME'
}
export interface EmptyMercuryResponseErrorOptions extends SpruceErrors.SpruceEventUtils.EmptyMercuryResponse, ISpruceErrorOptions {
	code: 'EMPTY_MERCURY_RESPONSE'
}

type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | MercuryResponseErrorErrorOptions  | InvalidEventNameErrorOptions  | EmptyMercuryResponseErrorOptions 

export default ErrorOptions
