/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

export { SpruceSchemas } from '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types'

import { default as SchemaEntity } from '@sprucelabs/schema'



import * as SpruceSchema from '@sprucelabs/schema'


declare module '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types' {


	namespace SpruceSchemas.SpruceEventUtils.v2021_09_13 {

		
		interface EventTarget {
			
				
				'locationId'?: string| undefined | null
				
				'personId'?: string| undefined | null
				
				'organizationId'?: string| undefined | null
				
				'skillId'?: string| undefined | null
				
				'roleId'?: string| undefined | null
		}

		interface EventTargetSchema extends SpruceSchema.Schema {
			id: 'eventTarget',
			version: 'v2021_09_13',
			namespace: 'SpruceEventUtils',
			name: 'event target',
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
			    }
		}

		type EventTargetEntity = SchemaEntity<SpruceSchemas.SpruceEventUtils.v2021_09_13.EventTargetSchema>

	}


	namespace SpruceSchemas.SpruceEventUtils.v2021_09_13 {

		
		interface EventSource {
			
				
				'locationId'?: string| undefined | null
				
				'personId'?: string| undefined | null
				
				'organizationId'?: string| undefined | null
				
				'skillId'?: string| undefined | null
				
				'roleId'?: string| undefined | null
				/** Proxy token. */
				'proxyToken'?: string| undefined | null
		}

		interface EventSourceSchema extends SpruceSchema.Schema {
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

		type EventSourceEntity = SchemaEntity<SpruceSchemas.SpruceEventUtils.v2021_09_13.EventSourceSchema>

	}


	namespace SpruceSchemas.SpruceEventUtils.v2021_09_13 {

		
		interface EventPagingResponse {
			
				
				'cursorId': string
		}

		interface EventPagingResponseSchema extends SpruceSchema.Schema {
			id: 'eventPagingResponse',
			version: 'v2021_09_13',
			namespace: 'SpruceEventUtils',
			name: 'eventPagingResponse',
			importsWhenRemote: ['import \'@sprucelabs/spruce-event-utils\'',],
			moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
			    fields: {
			            /** . */
			            'cursorId': {
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type EventPagingResponseEntity = SchemaEntity<SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingResponseSchema>

	}


	namespace SpruceSchemas.SpruceEventUtils.v2021_09_13 {

		
		interface EventPagingSort {
			
				
				'field': string
				
				'direction'?: ("asc" | "desc")| undefined | null
		}

		interface EventPagingSortSchema extends SpruceSchema.Schema {
			id: 'eventPagingSort',
			version: 'v2021_09_13',
			namespace: 'SpruceEventUtils',
			name: '',
			importsWhenRemote: ['import \'@sprucelabs/spruce-event-utils\'',],
			moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
			    fields: {
			            /** . */
			            'field': {
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'direction': {
			                type: 'select',
			                options: {choices: [{"value":"asc","label":"Ascending"},{"value":"desc","label":"Descending"}],}
			            },
			    }
		}

		type EventPagingSortEntity = SchemaEntity<SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingSortSchema>

	}


	namespace SpruceSchemas.SpruceEventUtils.v2021_09_13 {

		
		interface EventPaging {
			
				
				'pageSize'?: number| undefined | null
				
				'cursorId'?: string| undefined | null
				
				'sort'?: SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingSort[]| undefined | null
		}

		interface EventPagingSchema extends SpruceSchema.Schema {
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
			                options: {schema: SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingSortSchema,}
			            },
			    }
		}

		type EventPagingEntity = SchemaEntity<SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingSchema>

	}

}
