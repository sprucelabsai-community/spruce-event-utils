import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const eventPagingResponseSchema: SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingResponseSchema  = {
	id: 'eventPagingResponse',
	version: 'v2021_09_13',
	namespace: 'SpruceEventUtils',
	name: 'Event paging response',
	importsWhenRemote: ['import \'@sprucelabs/spruce-event-utils\'',],
	moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
	    fields: {
	            /** . */
	            'next': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'previous': {
	                type: 'id',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(eventPagingResponseSchema)

export default eventPagingResponseSchema
