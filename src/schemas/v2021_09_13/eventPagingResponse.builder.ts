import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'eventPagingResponse',
    name: 'Event paging response',
    moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
    importsWhenRemote: ["import '@sprucelabs/spruce-event-utils'"],
    fields: {
        next: {
            type: 'id',
        },
        previous: {
            type: 'id',
        },
    },
})
