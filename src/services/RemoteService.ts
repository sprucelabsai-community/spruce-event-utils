import { SchemaError } from '@sprucelabs/schema'
import { EnvService } from '@sprucelabs/spruce-skill-utils'
import { Remote, REMOTES } from '../constants'

export default class RemoteService {
    private env: EnvService

    public constructor(env: EnvService) {
        this.env = env
    }

    public set(remote: Remote) {
        //@ts-ignore
        const host = REMOTES[remote]
        if (!host) {
            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                friendlyMessage: `${remote} is not a valid remote. Try:\n\n${Object.keys(
                    REMOTES
                ).join('\n')}`,
                parameters: ['remote'],
            })
        }
        this.env.set('HOST', host)
    }

    public getHost() {
        return this.env.get('HOST')
    }

    public getRemote() {
        // move to constants or some better mapping?
        const values = Object.entries(REMOTES)
        const host = this.getHost()

        if (typeof host === 'undefined') {
            return null
        }

        const hostStr = host?.toString?.()
        const match = values.find((v) => hostStr?.indexOf?.(v[1]) > -1)

        if (!match) {
            if (hostStr?.startsWith?.('http')) {
                return 'custom'
            }

            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                friendlyMessage: `Mercury's env.HOST is set to '${host}', which I can't resolve to an environment.`,
                parameters: ['env.HOST'],
            })
        }
        return match?.[0] as Remote
    }
}
