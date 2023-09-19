import { getOfferSenderWallet } from '@echo/ui/helpers/offer/get-offer-sender-wallet'
import type { Offer } from '@echo/ui/types/model/offer'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import type { Wallet } from '@echo/ui/types/model/wallet'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - getOfferSenderWallet', () => {
  it('returns the wallet of the first sender item since they are all the same', () => {
    const wallet: Wallet = {
      address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
      chainId: 1
    }
    const offerItem = {
      nft: {
        owner: {
          wallet
        }
      }
    } as OfferItem
    const offer = {
      senderItems: [offerItem, offerItem, offerItem]
    } as unknown as Offer

    expect(getOfferSenderWallet(offer)).toStrictEqual(wallet)
  })
})
