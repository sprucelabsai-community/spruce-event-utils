/* eslint-disable @typescript-eslint/ban-types */
import {
	EventContract,
	EventSignature,
	MercuryEventEmitter,
} from '@sprucelabs/mercury-types'
import { Skill, Log } from '@sprucelabs/spruce-skill-utils'

type OptionalApiClient<
	IEventContract extends EventContract | undefined
> = IEventContract extends EventContract
	? {
			apiClient: MercuryEventEmitter<IEventContract>
	  }
	: {}

type OptionalPayload<
	EmitPayload extends Record<string, any> | undefined
> = EmitPayload extends Record<string, any>
	? {
			payload: EmitPayload
	  }
	: {}

export type SpruceEvent<
	IEventContract extends EventContract | undefined = undefined,
	EmitPayload extends Record<string, any> | undefined = undefined
> = {
	skill: Skill
	log: Log
} & OptionalApiClient<IEventContract> &
	OptionalPayload<EmitPayload>

export type SpruceEventResponse<
	ResponsePayload extends any = undefined
> = Promise<ResponsePayload>

export interface NamedEventSignature {
	fullyQualifiedEventName: string
	eventName: string
	eventNamespace?: string
	version: string
	signature: EventSignature
}
