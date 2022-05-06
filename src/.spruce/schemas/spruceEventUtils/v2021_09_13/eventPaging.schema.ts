import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventPagingSortSchema_v2021_09_13 from '#spruce/schemas/spruceEventUtils/v2021_09_13/eventPagingSort.schema'

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
	            /** . */
	            'cursorId': {
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

SchemaRegistry.getInstance().trackSchema(eventPagingSchema)

export default eventPagingSchema
