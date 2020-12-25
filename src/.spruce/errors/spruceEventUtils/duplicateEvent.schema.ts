import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const duplicateEventSchema: SpruceErrors.SpruceEventUtils.DuplicateEventSchema  = {
	id: 'duplicateEvent',
	namespace: 'SpruceEventUtils',
	name: 'Duplicate event',
	    fields: {
	            /** . */
	            'eventNameWithOptionalNamespace': {
	                type: 'text',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(duplicateEventSchema)

export default duplicateEventSchema
