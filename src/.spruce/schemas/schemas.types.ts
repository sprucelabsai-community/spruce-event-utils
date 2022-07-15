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

		interface EventTargetEntity extends SchemaEntity<SpruceSchemas.SpruceEventUtils.v2021_09_13.EventTargetSchema> {}

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

		interface EventSourceEntity extends SchemaEntity<SpruceSchemas.SpruceEventUtils.v2021_09_13.EventSourceSchema> {}

	}


	namespace SpruceSchemas.SpruceEventUtils.v2021_09_13 {

		
		interface EventPagingResponse {
			
				
				'next'?: string| undefined | null
				
				'previous'?: string| undefined | null
		}

		interface EventPagingResponseSchema extends SpruceSchema.Schema {
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

		interface EventPagingResponseEntity extends SchemaEntity<SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingResponseSchema> {}

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

		interface EventPagingSortEntity extends SchemaEntity<SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingSortSchema> {}

	}


	namespace SpruceSchemas.SpruceEventUtils.v2021_09_13 {

		
		interface EventPagingRequest {
			
				
				'pageSize'?: number| undefined | null
				
				'next'?: string| undefined | null
				
				'previous'?: string| undefined | null
				
				'sort'?: SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingSort[]| undefined | null
		}

		interface EventPagingRequestSchema extends SpruceSchema.Schema {
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
			                options: {schema: SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingSortSchema,}
			            },
			    }
		}

		interface EventPagingRequestEntity extends SchemaEntity<SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingRequestSchema> {}

	}

}
