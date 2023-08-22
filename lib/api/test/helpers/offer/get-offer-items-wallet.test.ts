import { getOfferItemsWallet } from '../../../src/helpers/offer/get-offer-items-wallet'
import { getOwnersForNft } from '@echo/alchemy'
import { getOfferMockById, getUserMockById } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/alchemy')

describe('helpers - offer - findNftCollectionByContract', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws an error if none of the users wallets are owner', async () => {
    jest.mocked(getOwnersForNft).mockResolvedValueOnce([
      { address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8', chainId: 1 },
      { address: '0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9', chainId: 1 },
      { address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE', chainId: 1 }
    ])
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const user = getUserMockById('6rECUMhevHfxABZ1VNOm')
    try {
      await getOfferItemsWallet(offer.senderItems, user)
      expect(true).toBeFalsy()
    } catch (e) {
      expect(e).toBeDefined()
    }
  })

  it('returns the users wallet if its in the owners list', async () => {
    jest.mocked(getOwnersForNft).mockResolvedValueOnce([
      { address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8', chainId: 1 },
      { address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D', chainId: 1 },
      { address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8', chainId: 1 },
      { address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D', chainId: 1 },
      { address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8', chainId: 1 }
    ])
    const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
    const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')
    const wallet = await getOfferItemsWallet(offer.senderItems, user)
    expect(wallet).toStrictEqual({ address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8', chainId: 1 })
  })
})
