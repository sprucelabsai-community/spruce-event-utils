import { SchemaError } from '@sprucelabs/schema'
import { Remote, REMOTES } from '../constants'

export const HEARTWOOD_REMOTES: Record<Remote, string> = {
	local: 'http://localhost:6006',
	developer: 'https://developer.spruce.bot',
	sandbox: 'https://sandbox.spruce.bot',
	production: 'https://spruce.bot',
}

const heartwoodRemoteUtil = {
	buildUrl(remote: Remote) {
		if (HEARTWOOD_REMOTES[remote]) {
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
