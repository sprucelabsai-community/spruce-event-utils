import { buildEventContract } from '@sprucelabs/mercury-types'
import AbstractSpruceTest, {
    assert,
    errorAssert,
    generateId,
    test,
} from '@sprucelabs/test-utils'
import eventContractUtil from '../../utilities/eventContract.utility'

export default class EventContractUtilityTest extends AbstractSpruceTest {
    @test()
    protected static noVersionResolvesToVersion() {
        const sig = eventContractUtil.getSignatureByName(
            {
                eventSignatures: {
                    'book-appointment::v1': {},
                },
            },
            //@ts-ignore
            'book-appointment'
        )

        assert.isTruthy(sig)
    }

    @test()
    protected static noVersionResolvesToLatestVersion() {
        const sig = eventContractUtil.getSignatureByName(
            {
                eventSignatures: {
                    'book-appointment::v1': {},
                    'book-appointment::v3': {},
                    'book-appointment::v5': {
                        emitPayloadSchema: {
                            id: 'test',
                            fields: {},
                        },
                    },
                    'book-appointment::v4': {},
                },
            },
            //@ts-ignore
            'book-appointment'
        )

        assert.isTruthy(sig.emitPayloadSchema)
    }

    @test()
    protected static canResolveQualifiedEventNameBasedOnName() {
        const name = eventContractUtil.resolveToLatestEventName(
            {
                eventSignatures: {
                    'book-appointment::v1': {},
                    'book-appointment::v3': {},
                    'book-appointment::v5': {
                        emitPayloadSchema: {
                            id: 'test',
                            fields: {},
                        },
                    },
                    'book-appointment::v4': {},
                },
            },
            'book-appointment'
        )

        assert.isEqual(name, 'book-appointment::v5')
    }

    @test()
    protected static canResolveQualifiedEventNameBasedOnName2() {
        const name = eventContractUtil.resolveToLatestEventName(
            {
                eventSignatures: {
                    'book-appointment::v1': {},
                    'book-appointment::v3': {},
                    'book-appointment::v5': {
                        emitPayloadSchema: {
                            id: 'test',
                            fields: {},
                        },
                    },
                    'book-appointment::v6': {
                        emitPayloadSchema: {
                            id: 'test',
                            fields: {},
                        },
                    },
                },
            },
            'book-appointment'
        )

        assert.isEqual(name, 'book-appointment::v6')
    }

    @test()
    protected static unifyingContractsWithNoEventsYieldsUndefined() {
        assert.isUndefined(eventContractUtil.unifyContracts([]))
    }

    @test()
    protected static unifyingContractsJoinsEvents() {
        const contract = eventContractUtil.unifyContracts([
            {
                eventSignatures: { 'good-event::1': {} },
            },
            {
                eventSignatures: { 'another-good-event::1': {} },
            },
        ])

        assert.isTruthy(contract?.eventSignatures['good-event::1'])
        assert.isTruthy(contract?.eventSignatures['another-good-event::1'])
    }

    @test()
    protected static unifyingCatchesDups() {
        const err = assert.doesThrow(() =>
            eventContractUtil.unifyContracts([
                {
                    eventSignatures: { 'good-event::1': {} },
                },
                {
                    eventSignatures: { 'good-event::1': {} },
                },
            ])
        )

        errorAssert.assertError(err, 'DUPLICATE_EVENT', {
            fullyQualifiedEventName: 'good-event::1',
        })
    }

    @test()
    protected static catchesDuplicatesWithManyContracts() {
        const err = assert.doesThrow(() =>
            eventContractUtil.unifyContracts([
                {
                    eventSignatures: {
                        'good-event::1': {},
                        'good-event::2': {},
                    },
                },
                {
                    eventSignatures: {
                        'good-event::3': {},
                        'good-event::4': {},
                    },
                },
                {
                    eventSignatures: { 'good-event::3': {} },
                },
            ])
        )

        errorAssert.assertError(err, 'DUPLICATE_EVENT', {
            fullyQualifiedEventName: 'good-event::3',
        })
    }

    @test()
    protected static canGetEventNamesByNamespace() {
        const names = eventContractUtil.getEventNames(
            {
                eventSignatures: {
                    'appointments.book-appointment::v1': {},
                    'appointments.cancel-appointment::v1': {},
                    'get-skill-views::v1': {},
                    'heartwood.register-skill-views::v1': {},
                },
            },
            'appointments'
        )

        assert.isEqualDeep(names, [
            'appointments.book-appointment::v1',
            'appointments.cancel-appointment::v1',
        ])
    }

    @test()
    protected static getNamedEventSignaturesGoesFast() {
        const contract = buildEventContract({
            eventSignatures: {},
        })

        new Array(2000).fill(0).forEach(() => {
            //@ts-ignore
            contract.eventSignatures[generateId()] = { isGlobal: true }
        })

        new Array(1000).fill(0).forEach(() => {
            eventContractUtil.getNamedEventSignatures(contract)
        })
    }

    @test()
    protected static async unifyingContractsCanUpsert() {
        const aiInstructions = generateId()

        const firstContract = buildEventContract({
            eventSignatures: {
                'good-event::1': {},
                'good-event::2': {},
            },
        })

        const secondContract = buildEventContract({
            eventSignatures: {
                'good-event::1': {
                    aiInstructions,
                },
            },
        })

        const contract = eventContractUtil.unifyContracts(
            [firstContract, secondContract],
            { shouldUpsert: true }
        )

        assert.isEqualDeep(contract, {
            eventSignatures: {
                'good-event::1': {
                    aiInstructions,
                },
                'good-event::2': {},
            },
        })
    }

    @test()
    protected static async unifyingCanUpsertWithDifferentEvents() {
        const description1 = generateId()
        const description2 = generateId()
        const firstContract = buildEventContract({
            eventSignatures: {
                'another-event::100': {
                    description: description1,
                },
                'a-third-event::200': {},
            },
        })

        const secondContract = buildEventContract({
            eventSignatures: {
                'another-event::100': {
                    description: description2,
                },
                'a-fourth-event::300': {},
            },
        })

        const contract = eventContractUtil.unifyContracts(
            [firstContract, secondContract],
            { shouldUpsert: true }
        )

        assert.isEqualDeep(contract, {
            eventSignatures: {
                'another-event::100': {
                    description: description2,
                },
                'a-third-event::200': {},
                'a-fourth-event::300': {},
            },
        })
    }
}
