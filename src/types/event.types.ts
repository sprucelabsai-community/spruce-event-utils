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

export type SkillMercuryEventEmitter = MercuryEventEmitter<SkillEventContract>

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
    isGlobal?: boolean
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
    EmitPayload extends Record<string, any> | undefined = undefined,
> = {
    skill: Skill
    log: Log
    connectToApiAsSkill: () => Contract extends SkillEventContract
        ? Promise<MercuryEventEmitter<Contract>>
        : unknown
} & SkillContext &
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
