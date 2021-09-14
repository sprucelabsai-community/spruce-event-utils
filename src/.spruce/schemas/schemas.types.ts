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

}
