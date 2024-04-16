import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const eventPagingSortSchema: SpruceSchemas.SpruceEventUtils.v2021_09_13.EventPagingSortSchema =
    {
        id: 'eventPagingSort',
        version: 'v2021_09_13',
        namespace: 'SpruceEventUtils',
        name: '',
        importsWhenRemote: ["import '@sprucelabs/spruce-event-utils'"],
        moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
        fields: {
            /** . */
            field: {
                type: 'id',
                isRequired: true,
                options: undefined,
            },
            /** . */
            direction: {
                type: 'select',
                options: {
                    choices: [
                        { value: 'asc', label: 'Ascending' },
                        { value: 'desc', label: 'Descending' },
                    ],
                },
            },
        },
    }

SchemaRegistry.getInstance().trackSchema(eventPagingSortSchema)

export default eventPagingSortSchema
