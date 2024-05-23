import { generateBaseOffer } from '@echo/frontend/lib/helpers/offer/generate-base-offer'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'

describe('helpers - offer - generateBaseOffer', () => {
  it('should generate a base offer correctly', () => {
    const sender = { username: 'sender' } as User
    const receiver = { username: 'receiver' } as User
    const senderOfferItems: Nft[] = [{ owner: sender } as Nft]
    const receiverOfferItems: Nft[] = [{ owner: receiver } as Nft]
    const expiresAt: number = Date.now()

    // Act
    const result = generateBaseOffer({ senderOfferItems, receiverOfferItems, expiresAt })

    // Assert
    expect(result.expiresAt).toBe(expiresAt)
    expect(result.receiverItems).toBe(receiverOfferItems)
    expect(result.senderItems).toBe(senderOfferItems)
    expect(result.state).toBe(OFFER_STATE_OPEN)
    expect(result.sender).toBe(sender)
    expect(result.receiver).toBe(receiver)
  })
})
