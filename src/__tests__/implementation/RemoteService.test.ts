import { EnvService } from '@sprucelabs/spruce-skill-utils'
import AbstractSpruceTest, {
    assert,
    errorAssert,
    generateId,
    test,
} from '@sprucelabs/test-utils'
import { REMOTE_LOCAL } from '../../constants'
import RemoteService from '../../services/RemoteService'

export default class RemoteServiceTest extends AbstractSpruceTest {
    @test('fails with bad 1', 'aoeuaou')
    @test('fails with bad 2', 1)
    @test('fails with bad 3', false)
    @test('fails with bad 4', null)
    protected static throwsErrorWithUnknownHost(host: string) {
        const env = new HostOnlyEnv(host)
        const remote = new RemoteService(env)
        const err = assert.doesThrow(() => remote.getRemote())
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['env.HOST'],
        })
    }

    @test()
    protected static returnsNullIfNoRemoteWasEverSet() {
        const env = new HostOnlyEnv(undefined)
        const remote = new RemoteService(env)
        const r = remote.getRemote()
        assert.isNull(r)
    }

    @test()
    protected static throwsWithBadEnv() {
        const env = new HostOnlyEnv('http://127.0.0.1')
        const remote = new RemoteService(env)

        //@ts-ignore
        const err = assert.doesThrow(() => remote.set(`${generateId()}`))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['remote'],
        })
    }

    @test()
    protected static canMatchWithAndWithoutEndingSlash() {
        this.assertResolvesToLocal(REMOTE_LOCAL)
        this.assertResolvesToLocal(REMOTE_LOCAL + '/')
    }

    @test()
    protected static async canHandleLocalWithDifferentPort() {
        this.assertResolvesToLocal('http://127.0.0.1:8082')
        this.assertResolvesToLocal('http://127.0.0.1:8083')
    }

    private static assertResolvesToLocal(url: string) {
        const env = new HostOnlyEnv(url)
        const remote = new RemoteService(env)
        assert.isEqual(remote.getRemote(), 'local')
    }
}

class HostOnlyEnv extends EnvService {
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
