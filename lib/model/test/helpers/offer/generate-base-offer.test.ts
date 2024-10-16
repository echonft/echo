import { generateBaseOffer } from '@echo/model/helpers/offer/generate-base-offer'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { User } from '@echo/model/types/user/user'
import { describe, expect, it } from '@jest/globals'
import type { NonEmptyArray } from 'ramda'

describe('helpers - offer - generateBaseOffer', () => {
  it('should generate a base offer correctly', () => {
    const sender = { username: 'sender' } as User
    const receiver = { username: 'receiver' } as User
    const senderOfferItems: NonEmptyArray<OwnedNft> = [{ owner: sender } as OwnedNft]
    const receiverOfferItems: NonEmptyArray<OwnedNft> = [{ owner: receiver } as OwnedNft]
    const expiresAt: number = Date.now()

    // Act
    const result = generateBaseOffer({ senderOfferItems, receiverOfferItems, expiresAt })

    // Assert
    expect(result.expiresAt).toBe(expiresAt)
    expect(result.receiverItems).toBe(receiverOfferItems)
    expect(result.senderItems).toBe(senderOfferItems)
    expect(result.sender).toBe(sender)
    expect(result.receiver).toBe(receiver)
  })
})
