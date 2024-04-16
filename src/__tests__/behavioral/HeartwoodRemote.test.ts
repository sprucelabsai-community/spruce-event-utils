import AbstractSpruceTest, {
    assert,
    errorAssert,
    test,
} from '@sprucelabs/test-utils'
import { Remote, REMOTES } from '../../constants'
import heartwoodRemoteUtil, {
    HEARTWOOD_REMOTES,
} from '../../utilities/heartwoodRemote.utility'

export default class HeartwoodRemoteUtilTest extends AbstractSpruceTest {
    @test()
    protected static async canCreateHeartwoodRemoteUtil() {
        assert.isTruthy(heartwoodRemoteUtil)
    }

    @test()
    protected static async cantSetBadRemote() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            heartwoodRemoteUtil.buildUrl('aoeuaoeu')
        )
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['remote'],
        })
    }

    @test()
    protected static canSetGoodRemote() {
        for (const env of Object.keys(REMOTES)) {
            //@ts-ignore
            const expected = HEARTWOOD_REMOTES[env]
            assert.isString(
                expected,
                `HEARTWOOD_REMOTES does not have an entry for ${env}!`
            )

            const actual = heartwoodRemoteUtil.buildUrl(env as Remote)
            assert.isEqual(actual, expected)
        }
    }
}
