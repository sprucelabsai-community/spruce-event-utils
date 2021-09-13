import { EventContract, EventNames } from '@sprucelabs/mercury-types'
import { EVENT_VERSION_DIVIDER } from '../constants'
import SpruceError from '../errors/SpruceError'
import { NamedEventSignature } from '../types/event.types'
import eventNameUtil from './eventName.utility'

const eventContractUtil = {
	getEventNames(contract: EventContract, namespace?: string) {
		let names = Object.keys(contract.eventSignatures)

		if (namespace) {
			names = names.filter(
				(n) => eventNameUtil.split(n).eventNamespace === namespace
			)
		}

		return names
	},

	getNamedEventSignatures(contract: EventContract): NamedEventSignature[] {
		const names = this.getEventNames(contract)

		return names.map((name) => {
			const nameParts = eventNameUtil.split(name)
			return {
				fullyQualifiedEventName: name,
				eventName: nameParts.eventName,
				eventNamespace: nameParts.eventNamespace,
				signature: contract.eventSignatures[name],
				version: nameParts.version,
			} as NamedEventSignature
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
						fullyQualifiedEventName: name,
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

	resolveToLatestEventName<Contract extends EventContract>(
		contract: Contract,
		fullyQualifiedEventName: string
	) {
		const sigs = this.getNamedEventSignatures(contract)
		let match = sigs.find(
			(event) => event.fullyQualifiedEventName === fullyQualifiedEventName
		)

		if (match) {
			return fullyQualifiedEventName
		}

		const search = fullyQualifiedEventName + EVENT_VERSION_DIVIDER
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
			(event) => event.fullyQualifiedEventName === latestVersion
		)

		if (match) {
			return latestVersion
		}

		throw new SpruceError({
			code: 'INVALID_EVENT_NAME',
			fullyQualifiedEventName,
			validNames: this.getEventNames(contract),
		})
	},

	getSignatureByName<Contract extends EventContract>(
		contract: Contract,
		fullyQualifiedEventName: EventNames<Contract>
	) {
		const sigs = this.getNamedEventSignatures(contract)
		const resolvedName = this.resolveToLatestEventName(
			contract,
			fullyQualifiedEventName
		)

		let match = sigs.find(
			(event) => event.fullyQualifiedEventName === resolvedName
		)

		if (!match) {
			throw new SpruceError({
				code: 'INVALID_EVENT_NAME',
				fullyQualifiedEventName,
				validNames: this.getEventNames(contract),
			})
		}

		return match.signature
	},
}

export default eventContractUtil
