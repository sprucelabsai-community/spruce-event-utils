import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const eventContractsNotSyncedSchema: SpruceErrors.SpruceEventUtils.EventContractsNotSyncedSchema  = {
	id: 'eventContractsNotSynced',
	namespace: 'SpruceEventUtils',
	name: 'EVENT_CONTRACTS_NOT_SYNCED',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(eventContractsNotSyncedSchema)

export default eventContractsNotSyncedSchema
