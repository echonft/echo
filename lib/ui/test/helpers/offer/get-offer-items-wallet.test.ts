import { getOfferItemsWallet } from '@echo/ui/helpers/offer/get-offer-items-wallet'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import type { Wallet } from '@echo/ui/types/model/wallet'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - getOfferItemsWallet', () => {
  it('returns the wallet of the first item since they are all the same', () => {
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
    expect(getOfferItemsWallet([offerItem, offerItem, offerItem])).toStrictEqual(wallet)
  })
})
