import { SchemaError } from '@sprucelabs/schema'
import { Remote, REMOTES } from '../constants'

export const HEARTWOOD_REMOTES: Omit<Record<Remote, string>, 'custom'> = {
    local: 'http://localhost:8080',
    developer: 'https://dev.spruce.bot',
    demo: 'https://demo.spruce.bot',
    sandbox: 'https://sandbox.spruce.bot',
    polish: 'https://polish.spruce.bot',
    production: 'https://spruce.bot',
    heartwood_test: 'https://heartwood-test.spruce.bot',
}

const heartwoodRemoteUtil = {
    buildUrl(remote: Remote) {
        //@ts-ignore
        if (HEARTWOOD_REMOTES[remote]) {
            //@ts-ignore
            return HEARTWOOD_REMOTES[remote]
        }
        throw new SchemaError({
            code: 'INVALID_PARAMETERS',
            friendlyMessage: `\`${remote}\` is not a valid Remote. Valid options are:\n\n${Object.keys(
                REMOTES
            ).join('\n')}`,
            parameters: ['remote'],
        })
    },
}

export default heartwoodRemoteUtil
