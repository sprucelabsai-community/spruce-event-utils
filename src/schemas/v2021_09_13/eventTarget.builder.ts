import { buildSchema, dropFields } from '@sprucelabs/schema'
import { messageTargetSchema } from '@sprucelabs/spruce-core-schemas'

export default buildSchema({
    id: 'eventTarget',
    name: 'event target',
    moduleToImportFromWhenRemote: '@sprucelabs/spruce-event-utils',
    importsWhenRemote: ["import '@sprucelabs/spruce-event-utils'"],
    fields: {
        ...dropFields(messageTargetSchema.fields, ['phone']),
    },
})
