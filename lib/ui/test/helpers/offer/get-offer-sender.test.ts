import { getOfferSender } from '@echo/ui/helpers/offer/get-offer-sender'
import type { Offer } from '@echo/ui/types/model/offer'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import type { User } from '@echo/ui/types/model/user'
import type { Wallet } from '@echo/ui/types/model/wallet'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - getOfferSenderWallet', () => {
  it('returns the wallet of the first sender item since they are all the same', () => {
    const wallet: Wallet = {
      address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
      chainId: 1
    }
    const owner: User = {
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: 'johnnycagewins'
      },
      username: 'username',
      wallet
    }
    const offerItem = {
      nft: {
        owner
      }
    } as OfferItem
    const offer = {
      senderItems: [offerItem, offerItem, offerItem]
    } as unknown as Offer

    expect(getOfferSender(offer)).toStrictEqual(owner)
  })
})
