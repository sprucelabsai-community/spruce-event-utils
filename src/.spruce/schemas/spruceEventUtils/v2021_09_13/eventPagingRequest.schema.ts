import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventPagingSortSchema_v2021_09_13 from '#spruce/schemas/spruceEventUtils/v2021_09_13/eventPagingSort.schema'

const eventPagingRequestSchema: SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingRequestSchema  = {
	id: 'eventPagingRequest',
	version: 'v2021_09_13',
	namespace: 'SpruceEventUtils',
	name: 'Event paging request',
	importsWhenRemote: ['import \'@sprucelabs/spruce-event-utils\'',],
	moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
	    fields: {
	            /** . */
	            'pageSize': {
	                type: 'number',
	                options: undefined
	            },
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
	            /** . */
	            'sort': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: eventPagingSortSchema_v2021_09_13,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(eventPagingRequestSchema)

export default eventPagingRequestSchema
