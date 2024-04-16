import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'duplicateEvent',
    name: 'Duplicate event',
    description: '',
    fields: {
        fullyQualifiedEventName: {
            type: 'text',
        },
    },
})
