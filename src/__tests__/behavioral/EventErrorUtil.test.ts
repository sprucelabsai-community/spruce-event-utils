import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import SpruceError from '../../errors/SpruceError'
import eventErrorAssertUtil from '../../utilities/eventErrorAssert.utility'
import eventResponseUtil from '../../utilities/eventResponse.utility'

export default class EventErrorUtilTest extends AbstractSpruceTest {
	private static readonly errorWithoutErrorInstance = {
		totalContracts: 0,
		totalErrors: 0,
		totalResponses: 0,
		responses: [
			{
				errors: [
					{
						options: { code: 'COOL_ERROR', foo: 'bar' },
					},
				],
			},
		],
	}

	private static readonly twoErrorsWithoutErrorInstance = {
		totalContracts: 0,
		totalErrors: 0,
		totalResponses: 0,
		responses: [
			{
				errors: [
					{
						options: { code: 'COOL_ERROR', foo: 'bar' },
					},
					{
						options: { code: 'ANOTHER_ERROR', foo: 'bar' },
					},
				],
			},
		],
	}

	@test()
	protected static canAssertMercuryError() {
		const err = assert.doesThrow(() =>
			eventResponseUtil.getFirstResponseOrThrow(
				eventResponseUtil.mutatingMapAggregateResponseErrorsToSpruceErrors(
					this.errorWithoutErrorInstance,
					SpruceError
				)
			)
		)

		assert.doesThrow(() =>
			eventErrorAssertUtil.assertError(err, 'COOL_ERROR', {
				foo: 'bar2',
			})
		)

		eventErrorAssertUtil.assertError(err, 'COOL_ERROR', {
			foo: 'bar',
		})
	}

	@test()
	protected static canAssertMercuryErrorFromRawResponse() {
		const response = eventResponseUtil.mutatingMapAggregateResponseErrorsToSpruceErrors(
			this.errorWithoutErrorInstance,
			SpruceError
		)

		assert.doesThrow(() =>
			eventErrorAssertUtil.assertErrorFromResponse(response, 'COOL_ERROR', {
				foo: 'bar2',
			})
		)

		eventErrorAssertUtil.assertErrorFromResponse(response, 'COOL_ERROR', {
			foo: 'bar',
		})
	}

	@test()
	protected static throwsWithTooManyErrors() {
		const response = eventResponseUtil.mutatingMapAggregateResponseErrorsToSpruceErrors(
			this.twoErrorsWithoutErrorInstance,
			SpruceError
		)

		const err = assert.doesThrow(() =>
			eventErrorAssertUtil.assertErrorFromResponse(response, 'COOL_ERROR', {
				foo: 'bar',
			})
		)

		assert.doesInclude(err.message, 'more than 1')
	}
}
