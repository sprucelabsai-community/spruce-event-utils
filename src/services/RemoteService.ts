import { EnvService } from '@sprucelabs/spruce-skill-utils'
import { Remote, REMOTES } from '../constants'

//extracted from cli, local testing going forward
export default class RemoteService {
	private env: EnvService

	public constructor(env: EnvService) {
		this.env = env
	}

	public set(remote: Remote) {
		const host = REMOTES[remote]
		this.env.set('HOST', host)
	}

	public getHost() {
		return this.env.get('HOST')
	}

	public getRemote() {
		// move to constants or some better mapping?
		const values = Object.entries(REMOTES)
		const host = this.getHost()
		const match = values.find((v) => host.toString().indexOf(v[1]) > -1)

		if (!match) {
			throw new Error(
				`Mercury is set to ${host}, which I can't resolve to an environment.`
			)
		}
		return match?.[0] as Remote
	}
}
