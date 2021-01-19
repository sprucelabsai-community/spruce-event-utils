import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import SpruceError from '../../errors/SpruceError'

export default class SpruceErrorTest extends AbstractSpruceTest {
	@test()
	protected static async canHandleSpruceErrorOptions() {
		const result = new SpruceError({
			code: 'MERCURY_RESPONSE_ERROR',
			responseErrors: [
				//@ts-ignore
				{
					options: {
						code: 'INVALID_PIN',
						challenge: '60071f4ed042e91c20211065',
						pin: '1111',
						friendlyMessage: "That pin isn't right!",
					},
				},
			],
		})

		assert.isTruthy(result)
		assert.doesInclude(result.message, "That pin isn't right!")
	}

	@test()
	protected static async canHandleErrorInstance() {
		const error = new Error('Hey there!')
		const result = new SpruceError({
			code: 'MERCURY_RESPONSE_ERROR',
			//@ts-ignore
			responseErrors: [error],
		})

		assert.isTruthy(result)
		assert.doesInclude(result.message, 'Hey there!')
	}

	@test()
	protected static async canHandleSpruceErrorInstance() {
		const error = new SpruceError({ code: 'UNKNOWN_ERROR' })
		const result = new SpruceError({
			code: 'MERCURY_RESPONSE_ERROR',
			responseErrors: [error],
		})

		assert.isTruthy(result)
		assert.doesInclude(result.message, 'UNKNOWN_ERROR')
	}
}
