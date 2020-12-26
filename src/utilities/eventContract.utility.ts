import {
	EventContract,
	EventNames,
	EventSignature,
} from '@sprucelabs/mercury-types'
import { EVENT_VERSION_DIVIDER } from '../constants'
import SpruceError from '../errors/SpruceError'
import eventNameUtil from './eventName.utility'

export interface NamedEventSignature {
	eventNameWithOptionalNamespace: string
	eventName: string
	eventNamespace?: string
	version?: string
	signature: EventSignature
}

const eventContractUtil = {
	getEventNames(contract: EventContract) {
		return Object.keys(contract.eventSignatures)
	},

	getNamedEventSignatures(contract: EventContract): NamedEventSignature[] {
		const names = this.getEventNames(contract)

		return names.map((name) => {
			const nameParts = eventNameUtil.split(name)
			return {
				eventNameWithOptionalNamespace: name,
				eventName: nameParts.eventName,
				eventNamespace: nameParts.eventNamespace,
				signature: contract.eventSignatures[name],
				version: nameParts.version,
			}
		})
	},

	unifyContracts<Contract extends EventContract = EventContract>(
		contracts: Contract[]
	) {
		if (!contracts || contracts.length === 0) {
			return undefined
		}

		const unifiedContract: EventContract = {
			eventSignatures: {},
		}

		let existingNames: string[] = []

		for (const contract of contracts ?? []) {
			const names = Object.keys(contract.eventSignatures)
			for (const name of names) {
				if (existingNames.indexOf(name) > -1) {
					throw new SpruceError({
						code: 'DUPLICATE_EVENT',
						eventNameWithOptionalNamespace: name,
					})
				}
			}

			existingNames.push(...names)

			unifiedContract.eventSignatures = {
				...unifiedContract.eventSignatures,
				...contract.eventSignatures,
			}
		}

		return unifiedContract as Contract
	},

	getSignatureByName<Contract extends EventContract>(
		contract: Contract,
		eventNameWithOptionalNamespace: EventNames<Contract>
	) {
		const sigs = this.getNamedEventSignatures(contract)
		let match = sigs.find(
			(event) =>
				event.eventNameWithOptionalNamespace === eventNameWithOptionalNamespace
		)

		if (!match) {
			const search = eventNameWithOptionalNamespace + EVENT_VERSION_DIVIDER
			const matchesOnVersion = Object.keys(contract.eventSignatures).filter(
				(name) => {
					if (name.search(search) === 0) {
						return true
					}

					return false
				}
			)

			matchesOnVersion.sort((a, b) => {
				const v1 = a.split('::').pop() ?? 0
				const v2 = b.split('::').pop() ?? 0

				if (v1 > v2) {
					return 1
				} else if (v1 < v2) {
					return -1
				}

				return 0
			})

			const latestVersion = matchesOnVersion.pop()

			match = sigs.find(
				(event) => event.eventNameWithOptionalNamespace === latestVersion
			)
		}

		if (!match) {
			throw new SpruceError({
				code: 'INVALID_EVENT_NAME',
				eventNameWithOptionalNamespace,
				validNames: this.getEventNames(contract),
			})
		}

		return match.signature
	},

	generateResponseEventName(eventNameWithOptionalNamespace: string) {
		const { eventName, eventNamespace, version } = eventNameUtil.split(
			eventNameWithOptionalNamespace
		)

		let name = `${eventNameUtil.join({
			eventNamespace,
			eventName,
		})}:response`

		if (version) {
			name += '::' + version
		}

		return name
	},
}

export default eventContractUtil
