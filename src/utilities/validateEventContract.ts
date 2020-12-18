import { EventContract, eventContractSchema } from '@sprucelabs/mercury-types'
import { validateSchemaValues } from '@sprucelabs/schema'

export default function validateEventContract<C extends EventContract>(
	contract: C
): asserts contract is C {
	validateSchemaValues(eventContractSchema, contract)
}
