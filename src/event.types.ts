import { EventContract, MercuryEventEmitter } from '@sprucelabs/mercury-types'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'

type Skill = SpruceSchemas.Spruce.v2020_07_22.Skill

export type SpruceEvent<
	EventContracts extends EventContract,
	EmitPayload extends Record<string, any> | undefined = undefined
> = {
	skill: Skill
	apiClient: MercuryEventEmitter<EventContracts>
} & (EmitPayload extends Record<string, any>
	? {
			payload: EmitPayload
	  }
	: // eslint-disable-next-line @typescript-eslint/ban-types
	  {})

export type SpruceEventResponse<ResponsePayload> = Promise<ResponsePayload>
