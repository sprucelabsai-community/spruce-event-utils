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

	private static readonly mercuryResponseError = {
		totalContracts: 0,
		totalErrors: 0,
		totalResponses: 0,
		responses: [
			{
				errors: [
					{
						options: {
							code: 'MERCURY_RESPONSE_ERROR',
							responseErrors: [
								{
									options: {
										code: 'INVALID_SKILL_ID_OR_KEY',
										originalError: {
											options: {
												code: 'RECORD_NOT_FOUND',
												friendlyMessage:
													"I couldn't find a skill with that id and apiKey. Sorry about that!",
												storeName: 'Skill',
												query: {
													id: '6022d6a66b786d004543005e',
													apiKey: '6022d6a66b786d004543005f',
												},
											},
										},
										friendlyMessage:
											"I couldn't find a skill with that id and apiKey. Sorry about that!",
									},
									originalError: {
										options: {
											code: 'RECORD_NOT_FOUND',
											friendlyMessage:
												"I couldn't find a skill with that id and apiKey. Sorry about that!",
											storeName: 'Skill',
											query: {
												id: '6022d6a66b786d004543005e',
												apiKey: '6022d6a66b786d004543005f',
											},
										},
									},
								},
							],
							friendlyMessage:
								"Got an error from the server:\n\n\n\nGot an error from the server:\n\nI couldn't find a skill with that id and apiKey. Sorry about that!",
						},
						stack:
							"Error: Got an error from the server:\n\nI couldn't find a skill with that id and apiKey. Sorry about that!\n    at Object.getFirstResponseOrThrow (/Volumes/RAMDisk/spruce-cli/cbf7c356-96e9-4eec-9882-6a29513f5354/node_modules/@sprucelabs/spruce-event-utils/src/utilities/eventResponse.utility.ts:74:10)\n    at EventFeaturePlugin._callee9$ (/Volumes/RAMDisk/spruce-cli/cbf7c356-96e9-4eec-9882-6a29513f5354/node_modules/@sprucelabs/spruce-event-plugin/src/plugins/event.plugin.ts:301:40)\n    at tryCatch (/Volumes/RAMDisk/spruce-cli/cbf7c356-96e9-4eec-9882-6a29513f5354/node_modules/regenerator-runtime/runtime.js:63:40)\n    at Generator.invoke [as _invoke] (/Volumes/RAMDisk/spruce-cli/cbf7c356-96e9-4eec-9882-6a29513f5354/node_modules/regenerator-runtime/runtime.js:293:22)\n    at Generator.next (/Volumes/RAMDisk/spruce-cli/cbf7c356-96e9-4eec-9882-6a29513f5354/node_modules/regenerator-runtime/runtime.js:118:21)\n    at asyncGeneratorStep (/Volumes/RAMDisk/spruce-cli/cbf7c356-96e9-4eec-9882-6a29513f5354/node_modules/@babel/runtime/helpers/asyncToGenerator.js:3:24)\n    at _next (/Volumes/RAMDisk/spruce-cli/cbf7c356-96e9-4eec-9882-6a29513f5354/node_modules/@babel/runtime/helpers/asyncToGenerator.js:25:9)\n    at processTicksAndRejections (internal/process/task_queues.js:97:5)",
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
		const response =
			eventResponseUtil.mutatingMapAggregateResponseErrorsToSpruceErrors(
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
		const response =
			eventResponseUtil.mutatingMapAggregateResponseErrorsToSpruceErrors(
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

	@test()
	protected static assertsDoesIncludeErrorThrowsIfItDoesNotInclude() {
		const response =
			eventResponseUtil.mutatingMapAggregateResponseErrorsToSpruceErrors(
				this.twoErrorsWithoutErrorInstance,
				SpruceError
			)

		assert.doesThrow(() =>
			eventErrorAssertUtil.assertResponseIncludesError(
				response,
				'COOL_ERROR_NOT_FOUND',
				{
					foo: 'bar',
				}
			)
		)
	}

	@test()
	protected static assertsDoesIncludeError() {
		const response =
			eventResponseUtil.mutatingMapAggregateResponseErrorsToSpruceErrors(
				this.twoErrorsWithoutErrorInstance,
				SpruceError
			)

		eventErrorAssertUtil.assertResponseIncludesError(response, 'COOL_ERROR', {
			foo: 'bar',
		})
	}

	@test()
	protected static mapsResponseErrorErrors() {
		const response =
			eventResponseUtil.mutatingMapAggregateResponseErrorsToSpruceErrors(
				this.mercuryResponseError,
				SpruceError
			)

		const err = response.responses[0].errors?.[0]

		assert.isTruthy(err)
		assert.isEqual(err.options.code, 'MERCURY_RESPONSE_ERROR')
		const subErr = err.options.responseErrors[0]

		assert.isTrue(subErr instanceof SpruceError)
	}
}
