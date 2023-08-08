import { isNftOwnedByWallets } from '../../src/services/is-nft-owned-by-wallets'
import * as utils from '@echo/utils'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../src/constants/get-alchemy-api-key')

describe('services - isNftOwnedByWallets', () => {
  jest
    .spyOn(utils, 'getData')
    .mockImplementation(() => Promise.resolve({ owners: ['0xf672715f2bA85794659a7150e8C21F8d157bFe1D'] }))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns false if the address is not in the list of owners', async () => {
    const owned = await isNftOwnedByWallets({
      nft: { tokenId: 1, contractAddress: '' },
      wallets: [
        { chainId: 1, address: '6b3df6d9a8b5ab523fa24a71aca8160d' },
        { chainId: 1, address: '6b3df6d9a8b5ab523fa24a71aca8160d' }
      ]
    })
    expect(owned).toBeFalsy()
  })
  it('returns true if the address is in the list of owners', async () => {
    const owned = await isNftOwnedByWallets({
      nft: { tokenId: 1, contractAddress: '' },
      wallets: [
        { chainId: 1, address: '6b3df6d9a8b5ab523fa24a71aca8160d' },
        { chainId: 1, address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D' }
      ]
    })
    expect(owned).toBeTruthy()
  })
})
