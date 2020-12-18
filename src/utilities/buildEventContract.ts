import { EventContract, eventContractSchema } from '@sprucelabs/mercury-types'
import { validateSchemaValues } from '@sprucelabs/schema'

export default function buildEventContract<C extends EventContract>(
	contract: C
): C {
	validateSchemaValues(eventContractSchema, contract)
	return contract as C
}
