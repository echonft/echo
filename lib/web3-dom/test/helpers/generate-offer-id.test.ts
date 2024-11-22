import type { Item } from '@echo/model/types/item'
import type { BaseOffer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { generateOfferId } from '@echo/web3-dom/helpers/generate-offer-id'
import { describe, expect, test } from '@jest/globals'
import type { NonEmptyArray } from 'ramda'

// TODO Add tests for ERC20
describe('helpers - generateOfferId', () => {
  // Value generated from the contract
  const contractGeneratedId = '0x32099d4350d502cdc5a77eb70d8dd5d968ba402151db84cecbb28381c5295100'
  const receiverItems = [
    {
      quantity: 1,
      token: {
        contract: '0xe2a4b63ee2bbd0cab0b9ed3d63827ef5e7df6629',
        tokenId: 147
      }
    }
  ] as unknown as NonEmptyArray<Item>
  const senderItems = [
    {
      quantity: 1,
      token: {
        contract: '0xe2a4b63ee2bbd0cab0b9ed3d63827ef5e7df6629',
        tokenId: 148
      }
    }
  ] as unknown as NonEmptyArray<Item>
  const baseOffer: BaseOffer = {
    expiresAt: 1732337797,
    receiver: { wallet: '0x1d16e74ec651538af22f4ce59bb58cb4a3e32898' } as unknown as User,
    receiverItems,
    sender: { wallet: '0x213be2f484ab480db4f18b0fe4c38e1c25877f09' } as unknown as User,
    senderItems
  }
  test('returns the same ID as contract for same values', () => {
    expect(generateOfferId(baseOffer)).toBe(contractGeneratedId)
  })
})
