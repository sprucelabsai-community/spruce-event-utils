import { SpruceErrors } from "#spruce/errors/errors.types"
import { SpruceErrorOptions, ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"
import { SchemaErrorOptions } from '@sprucelabs/schema'

export interface MercuryResponseErrorErrorOptions extends SpruceErrors.SpruceEventUtils.MercuryResponseError, ISpruceErrorOptions {
	code: 'MERCURY_RESPONSE_ERROR'
}
export interface InvalidEventNameErrorOptions extends SpruceErrors.SpruceEventUtils.InvalidEventName, ISpruceErrorOptions {
	code: 'INVALID_EVENT_NAME'
}
export interface EventPluginErrorErrorOptions extends SpruceErrors.SpruceEventUtils.EventPluginError, ISpruceErrorOptions {
	code: 'EVENT_PLUGIN_ERROR'
}
export interface EventContractsNotSyncedErrorOptions extends SpruceErrors.SpruceEventUtils.EventContractsNotSynced, ISpruceErrorOptions {
	code: 'EVENT_CONTRACTS_NOT_SYNCED'
}
export interface EmptyMercuryResponseErrorOptions extends SpruceErrors.SpruceEventUtils.EmptyMercuryResponse, ISpruceErrorOptions {
	code: 'EMPTY_MERCURY_RESPONSE'
}
export interface DuplicateEventErrorOptions extends SpruceErrors.SpruceEventUtils.DuplicateEvent, ISpruceErrorOptions {
	code: 'DUPLICATE_EVENT'
}

type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | MercuryResponseErrorErrorOptions  | InvalidEventNameErrorOptions  | EventPluginErrorErrorOptions  | EventContractsNotSyncedErrorOptions  | EmptyMercuryResponseErrorOptions  | DuplicateEventErrorOptions 

export default ErrorOptions
