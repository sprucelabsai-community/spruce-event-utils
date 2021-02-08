/* eslint-disable @typescript-eslint/ban-types */
import {
	EventContract,
	EventSignature,
	MercuryEventEmitter,
} from '@sprucelabs/mercury-types'
import { Skill, Log, HealthCheckItem } from '@sprucelabs/spruce-skill-utils'

type OptionalApiClient<
	IEventContract extends EventContract | undefined
> = IEventContract extends EventContract
	? {
			apiClient: MercuryEventEmitter<IEventContract>
	  }
	: {}

export interface EventHealthCheckItem extends HealthCheckItem {
	listeners: Omit<EventFeatureListener, 'callback'>[]
	contracts: { fullyQualifiedEventName: string }[]
	events: EventFeatureEvent[]
}

export interface EventFeatureListener {
	eventName: string
	eventNamespace: string
	version: string
	callback(event: SpruceEvent): Promise<void>
}

export interface EventFeatureEvent {
	eventName: string
	eventNamespace: string
	version: string
}

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

declare module '@sprucelabs/spruce-skill-utils/build/skill.types' {
	export interface HealthCheckResults {
		event?: EventHealthCheckItem
	}
}
