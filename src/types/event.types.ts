/* eslint-disable @typescript-eslint/ban-types */
import {
	EventSignature,
	MercuryEventEmitter,
	SkillEventContract,
} from '@sprucelabs/mercury-types'
import {
	Skill,
	Log,
	HealthCheckItem,
	SkillContext,
} from '@sprucelabs/spruce-skill-utils'
import { EventSource } from '../utilities/buildEmitTargetAndPayloadSchema'

/** @ts-ignore **/
export type SkillMercuryEventEmitter = MercuryEventEmitter<SkillEventContract>

type OptionalMercuryClient<Contract extends SkillEventContract | undefined> =
	Contract extends SkillEventContract
		? {
				/** @ts-ignore **/
				client: MercuryEventEmitter<Contract>
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

type OptionalPayload<EmitPayload extends Record<string, any> | undefined> =
	EmitPayload extends Record<string, any> ? EmitPayload : {}

export type SpruceEvent<
	Contract extends SkillEventContract | undefined = undefined,
	EmitPayload extends Record<string, any> | undefined = undefined
> = {
	skill: Skill
	log: Log
	connectToApiAsSkill: () => Promise<MercuryEventEmitter<Contract>>
} & SkillContext &
	OptionalMercuryClient<Contract> &
	OptionalPayload<EmitPayload> & { source: EventSource }

export type SpruceEventResponse<ResponsePayload = void> =
	Promise<ResponsePayload>

export interface NamedEventSignature {
	fullyQualifiedEventName: string
	eventName: string
	eventNamespace?: string
	version: string
	signature: EventSignature
}

declare module '@sprucelabs/spruce-skill-utils/build/types/skill.types' {
	export interface HealthCheckResults {
		event?: EventHealthCheckItem
	}
}
