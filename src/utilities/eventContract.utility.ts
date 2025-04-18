import { EventContract, EventName } from '@sprucelabs/mercury-types'
import { EVENT_VERSION_DIVIDER } from '../constants'
import SpruceError from '../errors/SpruceError'
import { NamedEventSignature } from '../types/event.types'
import eventNameUtil from './eventName.utility'

const eventContractUtil = {
    getEventNames(contract: EventContract, namespace?: string) {
        const names = getEventNames(contract, namespace)
        return names
    },

    getNamedEventSignatures(contract: EventContract): NamedEventSignature[] {
        return getNamedEventSignatures(contract)
    },

    unifyContracts<Contract extends EventContract = EventContract>(
        contracts: Contract[],
        options?: { shouldUpsert?: boolean }
    ) {
        if (!contracts || contracts.length === 0) {
            return undefined
        }

        const { shouldUpsert = false } = options ?? {}

        const unifiedContract: EventContract = {
            eventSignatures: {},
        }

        let existingNames: string[] = []

        for (const contract of contracts ?? []) {
            if (!shouldUpsert) {
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
            }

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
        let match = getNamedSignature(fullyQualifiedEventName, contract)

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

        match = getNamedSignature(latestVersion!, contract)

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
        fullyQualifiedEventName: EventName<Contract>
    ) {
        const resolvedName = this.resolveToLatestEventName(
            contract,
            fullyQualifiedEventName
        )
        let match = getNamedSignature(resolvedName!, contract)

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

function getEventNames(
    contract: EventContract,
    namespace?: string | undefined
) {
    let names = Object.keys(contract.eventSignatures)

    if (namespace) {
        names = names.filter(
            (n) => eventNameUtil.split(n).eventNamespace === namespace
        )
    }
    return names
}

const getNamedEventSignatures = (contract: EventContract) => {
    const names = getEventNames(contract)

    const sigs = names.map((name) => {
        return getNamedSignature(name, contract)!
    })

    return sigs
}

function getNamedSignature(name: string, contract: EventContract) {
    if (!contract.eventSignatures[name]) {
        return undefined
    }
    const nameParts = eventNameUtil.split(name)
    return {
        fullyQualifiedEventName: name,
        eventName: nameParts.eventName,
        eventNamespace: nameParts.eventNamespace,
        signature: contract.eventSignatures[name],
        version: nameParts.version,
    } as NamedEventSignature
}
