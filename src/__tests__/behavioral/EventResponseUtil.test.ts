import { MercuryAggregateResponse } from '@sprucelabs/mercury-types'
import AbstractSpruceTest, { assert, test } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import { eventErrorAssertUtil } from '../..'
import SpruceError from '../../errors/SpruceError'
import eventResponseUtil from '../../utilities/eventResponse.utility'

export default class EventResponseUtilTest extends AbstractSpruceTest {
	private static readonly responseWithErrorAsObjectLiteral: MercuryAggregateResponse<any> = {
		totalContracts: 3,
		totalErrors: 1,
		totalResponses: 3,
		responses: [
			{
				errors: [
					//@ts-ignore
					{
						options: { code: 'COOL_ERROR', foo: 'bar' },
					},
				],
			},
			{
				payload: {
					hello: 'world',
				},
			},
			{
				payload: {
					hello: 'world2',
				},
			},
		],
	}

	@test()
	protected static canMapResponseErrorsToSpruceErrors() {
		let response = this.responseWithErrorAsObjectLiteral

		eventResponseUtil.mutatingMapAggregateResponseErrorsToSpruceErrors(
			response,
			SpruceError
		)

		errorAssertUtil.assertError(
			//@ts-ignore
			response.responses[0].errors[0],
			'COOL_ERROR'
		)
	}

	@test()
	protected static throwsIfFirstResponseIsAnError() {
		const err = assert.doesThrow(() =>
			eventResponseUtil.getFirstResponseOrThrow(
				eventResponseUtil.mutatingMapAggregateResponseErrorsToSpruceErrors(
					this.responseWithErrorAsObjectLiteral,
					SpruceError
				)
			)
		)

		eventErrorAssertUtil.assertError(err, 'COOL_ERROR')
	}

	@test()
	protected static getsAllPayloadsAndErrors() {
		const {
			payloads,
			errors,
		} = eventResponseUtil.getAllResponsePayloadsAndErrors(
			this.responseWithErrorAsObjectLiteral,
			SpruceError
		)

		assert.isTruthy(errors)
		assert.isLength(errors, 1)
		assert.isTrue(errors[0] instanceof SpruceError)

		assert.isLength(payloads, 2)
	}

	@test()
	protected static throwsHelpfulErrorWhenNoResultsReturnedButExpectingAtLeastOne() {
		const err = assert.doesThrow(() =>
			eventResponseUtil.getFirstResponseOrThrow({
				totalContracts: 0,
				totalErrors: 0,
				totalResponses: 0,
				responses: [],
			})
		)

		eventErrorAssertUtil.assertError(err, 'EMPTY_MERCURY_RESPONSE')
	}
}
