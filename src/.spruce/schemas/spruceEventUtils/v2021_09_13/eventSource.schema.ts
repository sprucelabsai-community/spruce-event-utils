import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const eventSourceSchema: SpruceSchemas.SpruceEventUtils.v2021_09_13.EventSourceSchema  = {
	id: 'eventSource',
	version: 'v2021_09_13',
	namespace: 'SpruceEventUtils',
	name: 'event source',
	importsWhenRemote: ['import \'@sprucelabs/spruce-event-utils\'',],
	moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
	    fields: {
	            /** . */
	            'locationId': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'personId': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'organizationId': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'skillId': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'roleId': {
	                type: 'id',
	                options: undefined
	            },
	            /** Proxy token. */
	            'proxyToken': {
	                label: 'Proxy token',
	                type: 'id',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(eventSourceSchema)

export default eventSourceSchema
