import AbstractSpruceError from '@sprucelabs/error'
import {
	MercuryAggregateResponse,
	MercurySingleResponse,
} from '@sprucelabs/mercury-types'
import SpruceError from '../errors/SpruceError'

type MercuryAggregateResponseWithoutErrorInstances = Omit<
	MercuryAggregateResponse<any>,
	'responses'
> & {
	responses: MercurySingleResponseWithoutErrorInstances[]
}

type MercurySingleResponseWithoutErrorInstances = Omit<
	MercurySingleResponse<any>,
	'errors'
> & {
	errors?: any[]
}

const eventResponseUtil = {
	mutatingMapAggregateResponseErrorsToSpruceErrors<
		R extends
			| MercuryAggregateResponse<any>
			| MercuryAggregateResponseWithoutErrorInstances,
		T extends {
			prototype: any
		}
	>(results: R, ClassRef: T): MercuryAggregateResponse<any> {
		results.responses = (results as MercuryAggregateResponseWithoutErrorInstances).responses.map(
			(response) => {
				return this.mutatingMapSingleResonseErrorsToSpruceErrors(
					response,
					ClassRef
				)
			}
		)
		return results
	},

	mutatingMapSingleResonseErrorsToSpruceErrors<
		R extends MercurySingleResponse<any>,
		T extends {
			prototype: any
		}
	>(response: R, ClassRef: T): R {
		if (response.errors) {
			response.errors = response.errors.map((err) => mapError<T>(err, ClassRef))
		}
		return response
	},

	getFirstResponseOrThrow<R extends MercuryAggregateResponse<any>>(
		emitResponse: R
	) {
		if (!emitResponse?.responses?.[0]) {
			throw new SpruceError({
				code: 'MERCURY_RESPONSE_ERROR',
				responseErrors: [
					new SpruceError({
						code: 'EMPTY_MERCURY_RESPONSE',
					}),
				],
			})
		}

		const payload = emitResponse.responses[0].payload
		const errors = emitResponse.responses[0].errors

		if (errors) {
			throw new SpruceError({
				code: 'MERCURY_RESPONSE_ERROR',
				responseErrors: errors,
			})
		}

		return payload as NonNullable<R['responses'][number]['payload']>
	},

	getAllResponsePayloadsAndErrors<
		R extends MercuryAggregateResponse<any>,
		T extends new (...args: any) => any
	>(emitResponse: R, ClassRef: T) {
		type Payload = NonNullable<R['responses'][number]['payload']>

		type Results = {
			payloads: Payload[]
			errors?: InstanceType<T>[]
		}

		const payloads: Payload[] = emitResponse.responses
			.filter((r) => !!r.payload)
			.map((r) => r.payload)

		const results: Results = {
			payloads,
		}

		if (emitResponse.totalErrors > 0) {
			this.mutatingMapAggregateResponseErrorsToSpruceErrors(
				emitResponse,
				ClassRef
			)

			results.errors = []

			emitResponse.responses.forEach((r) => {
				r.errors?.forEach((err) => {
					//@ts-ignore
					results.errors?.push(err)
				})
			})
		}

		return results
	},
}

export default eventResponseUtil

function mapError<
	T extends {
		prototype: any
	}
>(err: AbstractSpruceError<any>, ClassRef: T): T['prototype'] {
	const spruceErr = AbstractSpruceError.parse(err, ClassRef)

	if (spruceErr.options.code === 'MERCURY_RESPONSE_ERROR') {
		spruceErr.options.responseErrors = spruceErr.options.responseErrors.map(
			(err: any) => AbstractSpruceError.parse(err, ClassRef)
		)
	}

	return spruceErr
}
