import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'invalidEventName',
    name: 'Invalid event name',
    description: '',
    fields: {
        fullyQualifiedEventName: {
            type: 'text',
            isRequired: true,
        },
        validNames: {
            type: 'text',
            isArray: true,
            isRequired: true,
        },
    },
})
