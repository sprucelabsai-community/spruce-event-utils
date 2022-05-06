import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const eventPagingResponseSchema: SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingResponseSchema  = {
	id: 'eventPagingResponse',
	version: 'v2021_09_13',
	namespace: 'SpruceEventUtils',
	name: 'eventPagingResponse',
	    fields: {
	            /** . */
	            'cursorId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(eventPagingResponseSchema)

export default eventPagingResponseSchema
