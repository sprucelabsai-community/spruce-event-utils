import { EnvService } from '@sprucelabs/spruce-skill-utils'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { REMOTE_LOCAL } from '../../constants'
import RemoteService from '../../services/RemoteService'

class TestEnv extends EnvService {
	private host: string
	public constructor(host: string) {
		super('')
		this.host = host
	}
	public set(_name: string, _value: any) {}
	public get(_name: string) {
		return this.host
	}
}

export default class RemoteServiceTest extends AbstractSpruceTest {
	@test()
	protected static throwsErrorWithUnknownHost() {
		const env = new TestEnv('aoeuaou')
		const remote = new RemoteService(env)
		assert.doesThrow(() => remote.getRemote())
	}
	@test()
	protected static canMatchWithAndWithoutEndingSlash() {
		const env = new TestEnv(REMOTE_LOCAL + '/')
		const remote = new RemoteService(env)
		assert.isEqual(remote.getRemote(), 'local')
	}
}
