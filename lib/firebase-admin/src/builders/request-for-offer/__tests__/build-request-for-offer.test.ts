import { FirestoreContractPrototype } from '../../../types/prototypes/contract/firestore-contract-prototype'
import { FirestoreRequestForOfferItemPrototype } from '../../../types/prototypes/request-for-offer/firestore-request-for-offer-item-prototype'
import { FirestoreRequestForOfferPrototype } from '../../../types/prototypes/request-for-offer/firestore-request-for-offer-prototype'
import { contractData } from '../../../utils/test/mocks/contract/contract-data'
import { discordGuildData } from '../../../utils/test/mocks/discord-guild/discord-guild-data'
import { userData } from '../../../utils/test/mocks/user/user-data'
import { buildRequestForOffer } from '../build-request-for-offer'
import {
  FirestoreContract,
  FirestoreContractData,
  FirestoreRequestForOffer,
  FirestoreRequestForOfferItem
} from '@echo/firestore'
import { RequestForOfferState } from '@echo/model'
import { DocumentReference } from '@google-cloud/firestore'
import { describe, expect, test } from '@jest/globals'
import dayjs, { unix } from 'dayjs'

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
function itemsEqual(
  a: FirestoreRequestForOfferItem[],
  b: FirestoreRequestForOfferItemPrototype[],
  contracts: FirestoreContractData[]
): boolean {
  if (a.length !== b.length || a.length !== contracts.length) {
    return false
  }
  for (const [index, item] of a.entries()) {
    const itemB = b[index]!
    const contract = contracts[index]!
    if (
      !(
        BigInt(item.tokenId!) === itemB.tokenId &&
        item.balance === itemB.balance &&
        item.contract.path === contract.refPath
      )
    ) {
      return false
    }
  }
  return true
}

describe('builders - request-for-offer - buildRequestForOffer', () => {
  const target: FirestoreContractPrototype[] = [
    { address: contractData['37dBlwJYahEAKeL0rNP8']!.address, chainId: contractData['37dBlwJYahEAKeL0rNP8']!.chainId },
    { address: contractData['hK2XrmnMpCVneRH7Mbo6']!.address, chainId: contractData['hK2XrmnMpCVneRH7Mbo6']!.chainId }
  ] as FirestoreContractPrototype[]
  const items: FirestoreRequestForOfferItemPrototype[] = [
    {
      tokenId: BigInt(1),
      contract: target[0]!
    },
    {
      tokenId: BigInt(2),
      contract: target[0]!
    },
    {
      tokenId: BigInt(1),
      contract: target[1]!
    }
  ]
  const contracts = [
    contractData['37dBlwJYahEAKeL0rNP8']!,
    contractData['37dBlwJYahEAKeL0rNP8']!,
    contractData['hK2XrmnMpCVneRH7Mbo6']!
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
    expect(offer.state).toBe(RequestForOfferState.CREATED)
    expect(offer.sender.path).toBe(userData['oE6yUEQBPn7PZ89yMjKn']!.refPath)
    expect(offer.discordGuild.path).toBe(discordGuildData['xA40abnyBq6qQHSYmtHj']!.refPath)
    expect(offer.activities).toHaveLength(0)
    expect(unix(offer.createdAt).isAfter(beforeTest)).toBeTruthy()
    expect(unix(offer.postedAt!).isAfter(beforeTest)).toBeTruthy()
    expect(unix(offer.expiresAt).isAfter(beforeTestExpiry)).toBeTruthy()
    expect(unix(offer.expiresAt).isSame(unix(offer.createdAt).add(1, 'day'))).toBeTruthy()
  }

  test('invalid guild throws an error', async () => {
    try {
      await buildRequestForOffer({ ...prototype, discordGuildId: '0' })
      // Make sure the test throws
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as Error).message).toBe('buildRequestForOffer Discord Guild does not exist')
    }
    try {
      await buildRequestForOffer({ ...prototype, discordGuildId: '' })
      // Make sure the test throws
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as Error).message).toBe('buildRequestForOffer Discord Guild does not exist')
    }
  })
  test('invalid target throws an error', async () => {
    try {
      await buildRequestForOffer({ ...prototype, target: [] })
      // Make sure the test throws
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as Error).message).toBe('buildRequestForOffer Invalid target')
    }
    try {
      await buildRequestForOffer({ ...prototype, target: [{ address: 'test', chainId: 1 }] })
      // Make sure the test throws
      expect(true).toBeFalsy()
    } catch (e) {
      expect((e as Error).message).toBe('buildRequestForOffer Invalid target')
    }
  })
  test('valid prototype returns object (single target)', async () => {
    const requestForOffer = await buildRequestForOffer({ ...prototype, target: [target[0]!] })
    checkBaseOfferValues(requestForOffer)
    expect(itemsEqual(requestForOffer.items, items, contracts)).toBeTruthy()
    expect(
      targetsEqual(requestForOffer.target as unknown as DocumentReference<FirestoreContract>[], [contracts[0]!])
    ).toBeTruthy()
  })
  test('valid prototype returns object (single item)', async () => {
    const requestForOffer = await buildRequestForOffer({ ...prototype, items: [items[0]!] })
    checkBaseOfferValues(requestForOffer)
    expect(itemsEqual(requestForOffer.items, [items[0]!], [contracts[0]!])).toBeTruthy()
    expect(
      targetsEqual(requestForOffer.target as unknown as DocumentReference<FirestoreContract>[], contracts.slice(-2))
    ).toBeTruthy()
  })
  test('valid prototype returns object', async () => {
    const requestForOffer = await buildRequestForOffer(prototype)
    checkBaseOfferValues(requestForOffer)
    expect(itemsEqual(requestForOffer.items, items, contracts)).toBeTruthy()
    expect(
      targetsEqual(requestForOffer.target as unknown as DocumentReference<FirestoreContract>[], contracts.slice(-2))
    ).toBeTruthy()
  })
})
