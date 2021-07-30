import { EnvService } from '@sprucelabs/spruce-skill-utils'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import { REMOTE_LOCAL } from '../../constants'
import RemoteService from '../../services/RemoteService'

class TestEnv extends EnvService {
	private host: string | undefined
	public constructor(host: string | undefined) {
		super('')
		this.host = host
	}
	public set(_name: string, _value: any) {}
	public get(_name: string) {
		return this.host
	}
}

export default class RemoteServiceTest extends AbstractSpruceTest {
	@test('fails with bad 1', 'aoeuaou')
	@test('fails with bad 2', 1)
	@test('fails with bad 3', false)
	@test('fails with bad 4', null)
	protected static throwsErrorWithUnknownHost(host: string) {
		const env = new TestEnv(host)
		const remote = new RemoteService(env)
		const err = assert.doesThrow(() => remote.getRemote())
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['env.HOST'],
		})
	}

	@test()
	protected static returnsNullIfNoRemoteWasEverSet() {
		const env = new TestEnv(undefined)
		const remote = new RemoteService(env)
		const r = remote.getRemote()
		assert.isNull(r)
	}

	@test()
	protected static throwsWithBadEnv() {
		const env = new TestEnv('http://127.0.0.1')
		const remote = new RemoteService(env)

		//@ts-ignore
		const err = assert.doesThrow(() => remote.set(`${Math.random() * 10}`))
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['remote'],
		})
	}

	@test()
	protected static canMatchWithAndWithoutEndingSlash() {
		const env = new TestEnv(REMOTE_LOCAL + '/')
		const remote = new RemoteService(env)
		assert.isEqual(remote.getRemote(), 'local')
	}
}
