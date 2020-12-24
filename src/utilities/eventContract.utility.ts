import {
	EventContract,
	EventNames,
	EventSignature,
} from '@sprucelabs/mercury-types'
import SpruceError from '../errors/SpruceError'

export interface NamedEventSignature {
	eventNameWithOptionalNamespace: string
	eventName: string
	eventNamespace?: string
	signature: EventSignature
}

const eventContractUtil = {
	getEventNames(contract: EventContract) {
		return Object.keys(contract.eventSignatures)
	},

	splitEventNameWithOptionalNamespace(
		name: string
	): { eventName: string; eventNamespace?: string; version?: string } {
		const versionParts = name.split('::')
		const eventNameWithOptionalNamespace = versionParts[0]
		const version = versionParts[1]

		const parts = eventNameWithOptionalNamespace.split('.')
		const eventNamespace = parts[1] ? parts[0] : undefined
		const eventName = parts[1] || parts[0]

		const e: any = {
			eventName,
		}

		if (eventNamespace) {
			e.eventNamespace = eventNamespace
		}

		if (version) {
			e.version = version
		}

		return e
	},

	joinEventNameWithOptionalNamespace(options: {
		eventName: string
		eventNamespace?: string
		version?: string
	}): string {
		const { eventName, eventNamespace } = options

		if (!eventNamespace) {
			return eventName
		}

		let eventNameWithOptionalNamespace = !eventNamespace
			? eventName
			: `${eventNamespace}.${eventName}`

		if (options.version) {
			eventNameWithOptionalNamespace += '::' + options.version
		}

		return eventNameWithOptionalNamespace
	},

	getNamedEventSignatures(contract: EventContract): NamedEventSignature[] {
		const names = this.getEventNames(contract)

		return names.map((name) => {
			const nameParts = this.splitEventNameWithOptionalNamespace(name)
			return {
				eventNameWithOptionalNamespace: name,
				eventName: nameParts.eventName,
				eventNamespace: nameParts.eventNamespace,
				signature: contract.eventSignatures[name],
			}
		})
	},

	unifyContracts<Contract extends EventContract = EventContract>(
		contracts: EventContract[]
	) {
		const unifiedContract: EventContract = {
			eventSignatures: {},
		}

		for (const contract of contracts ?? []) {
			unifiedContract.eventSignatures = {
				...unifiedContract.eventSignatures,
				...contract.eventSignatures,
			}
		}

		const eventContract =
			contracts && contracts.length > 0
				? (unifiedContract as Contract)
				: undefined

		return eventContract
	},

	getSignatureByName<Contract extends EventContract>(
		contract: Contract,
		eventNameWithOptionalNamespace: EventNames<Contract>
	) {
		const match = this.getNamedEventSignatures(contract).find(
			(event) =>
				event.eventNameWithOptionalNamespace === eventNameWithOptionalNamespace
		)

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
		const {
			eventName,
			eventNamespace,
			version,
		} = this.splitEventNameWithOptionalNamespace(eventNameWithOptionalNamespace)

		let name = `${this.joinEventNameWithOptionalNamespace({
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
