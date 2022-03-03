import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const eventPagingSchema: SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingSchema  = {
	id: 'eventPaging',
	version: 'v2021_09_13',
	namespace: 'SpruceEventUtils',
	name: 'Event Paging',
	importsWhenRemote: ['import \'@sprucelabs/spruce-event-utils\'',],
	moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
	    fields: {
	            /** . */
	            'pageSize': {
	                type: 'number',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(eventPagingSchema)

export default eventPagingSchema
