import { buildRequestForOffer } from '../../../src/builders/request-for-offer/build-request-for-offer'
import { FirestoreContract } from '../../../src/types/model/collections/contract/firestore-contract'
import { FirestoreRequestForOffer } from '../../../src/types/model/collections/request-for-offer/firestore-request-for-offer'
import { FirestoreContractData } from '../../../src/types/model/data/contract/firestore-contract-data'
import { FirestoreContractPrototype } from '../../../src/types/prototypes/contract/firestore-contract-prototype'
import { FirestoreRequestForOfferPrototype } from '../../../src/types/prototypes/request-for-offer/firestore-request-for-offer-prototype'
import { contractFirestoreData } from '../../mocks/contract/contract-firestore-data'
import { discordGuildFirestoreData } from '../../mocks/discord-guild/discord-guild-firestore-data'
import { requestForOfferFirestoreData } from '../../mocks/request-for-offer/request-for-offer-firestore-data'
import { userFirestoreData } from '../../mocks/user/user-firestore-data'
import { DocumentReference } from '@google-cloud/firestore'
import { describe, expect, test } from '@jest/globals'
import dayjs from 'dayjs'
import { prop } from 'ramda'

function targetsEqual(a: DocumentReference<FirestoreContract>[], b: FirestoreContractData[]) {
  if (a.length !== b.length) {
    return false
  }
  for (const [index, ref] of a.entries()) {
    if (!(ref.path === b[index]!.refPath)) {
      return false
    }
  }
  return true
}

describe('builders - request-for-offer - buildRequestForOffer', () => {
  const target: FirestoreContractPrototype[] = [
    {
      address: contractFirestoreData['37dBlwJYahEAKeL0rNP8']!.address,
      chainId: contractFirestoreData['37dBlwJYahEAKeL0rNP8']!.chainId
    },
    {
      address: contractFirestoreData['hK2XrmnMpCVneRH7Mbo6']!.address,
      chainId: contractFirestoreData['hK2XrmnMpCVneRH7Mbo6']!.chainId
    }
  ] as FirestoreContractPrototype[]
  const items: string[] = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!.items.map(prop('id'))
  const contracts = [
    contractFirestoreData['37dBlwJYahEAKeL0rNP8']!,
    contractFirestoreData['37dBlwJYahEAKeL0rNP8']!,
    contractFirestoreData['hK2XrmnMpCVneRH7Mbo6']!
  ]
  const prototype: FirestoreRequestForOfferPrototype = {
    senderId: 'oE6yUEQBPn7PZ89yMjKn',
    items,
    discordGuildId: '1',
    target
  }
  const beforeTest = dayjs().subtract(1, 'second')
  const beforeTestExpiry = dayjs(beforeTest).add(1, 'day')

  function checkBaseOfferValues(offer: FirestoreRequestForOffer) {
    expect(offer.state).toBe('CREATED')
    expect(offer.sender.path).toBe(userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!.refPath)
    expect(offer.discordGuild.path).toBe(discordGuildFirestoreData['xA40abnyBq6qQHSYmtHj']!.refPath)

    const activity = offer.activities[0]!
    expect(offer.activities).toHaveLength(1)
    expect(activity.fromState).toBeUndefined()
    expect(activity.toState).toBe('CREATED')
    expect(dayjs.unix(activity.date).isAfter(beforeTest)).toBeTruthy()

    expect(dayjs.unix(offer.createdAt).isAfter(beforeTest)).toBeTruthy()
    expect(offer.postedAt).toBeUndefined()
    expect(dayjs.unix(offer.expiresAt).isAfter(beforeTestExpiry)).toBeTruthy()
    expect(dayjs.unix(offer.expiresAt).isSame(dayjs.unix(offer.createdAt).add(1, 'day'))).toBeTruthy()
  }

  test('invalid guild throws an error', async () => {
    try {
      await buildRequestForOffer({ ...prototype, discordGuildId: '0' })
    } catch (error) {
      expect(error).toBe('getFirestoreDiscordGuildRefByDiscordId Discord Guild not found')
    }
    try {
      await buildRequestForOffer({ ...prototype, discordGuildId: '' })
    } catch (error) {
      expect(error).toBe('getFirestoreDiscordGuildRefByDiscordId Discord Guild not found')
    }
  })
  test('invalid target throws an error', async () => {
    try {
      await buildRequestForOffer({ ...prototype, target: [] })
    } catch (error) {
      expect(error).toBe('buildRequestForOffer Invalid target')
    }
    try {
      await buildRequestForOffer({ ...prototype, target: [{ address: 'test', chainId: 1 }] })
    } catch (error) {
      expect(error).toBe('getFirestoreContractRefByAddress Contract not found')
    }
  })
  test('valid prototype returns object (single target)', async () => {
    const requestForOffer = await buildRequestForOffer({ ...prototype, target: [target[0]!] })
    checkBaseOfferValues(requestForOffer)
    expect(requestForOffer.items.map((item) => item.id)).toStrictEqual(items)
    expect(
      targetsEqual(requestForOffer.target as unknown as DocumentReference<FirestoreContract>[], [contracts[0]!])
    ).toBeTruthy()
  })

  test('valid prototype returns object (single item)', async () => {
    const requestForOffer = await buildRequestForOffer({ ...prototype, items: [items[0]!] })
    checkBaseOfferValues(requestForOffer)
    expect(requestForOffer.items.map((item) => item.id)).toStrictEqual([items[0]!])
    expect(
      targetsEqual(requestForOffer.target as unknown as DocumentReference<FirestoreContract>[], contracts.slice(-2))
    ).toBeTruthy()
  })
  test('valid prototype returns object', async () => {
    const requestForOffer = await buildRequestForOffer(prototype)
    checkBaseOfferValues(requestForOffer)
    expect(requestForOffer.items.map((item) => item.id)).toStrictEqual(items)
    expect(
      targetsEqual(requestForOffer.target as unknown as DocumentReference<FirestoreContract>[], contracts.slice(-2))
    ).toBeTruthy()
  })
})
