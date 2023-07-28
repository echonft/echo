/* eslint-disable @typescript-eslint/ban-ts-comment */
import { isNftOwnedByWallets } from '../../src/services/is-nft-owned-by-wallets'
import * as utils from '@echo/utils'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

describe('services - isNftOwnedByWallets', () => {
  jest.spyOn(utils, 'getData').mockImplementation(() =>
    // @ts-ignore
    Promise.resolve(R.fromNullable({ owners: ['0xf672715f2bA85794659a7150e8C21F8d157bFe1D'] }, 'should not happen'))
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns false if the address is not in the list of owners', async () => {
    const result = await isNftOwnedByWallets({
      nft: { tokenId: 1, contractAddress: '' },
      wallets: [
        { chainId: 1, address: '6b3df6d9a8b5ab523fa24a71aca8160d' },
        { chainId: 1, address: '6b3df6d9a8b5ab523fa24a71aca8160d' }
      ]
    })
    expect(R.isError(result)).toBeFalsy()
    expect(R.getExn(result)).toBeFalsy()
  })
  it('returns true if the address is in the list of owners', async () => {
    const result = await isNftOwnedByWallets({
      nft: { tokenId: 1, contractAddress: '' },
      wallets: [
        { chainId: 1, address: '6b3df6d9a8b5ab523fa24a71aca8160d' },
        { chainId: 1, address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D' }
      ]
    })
    expect(R.isError(result)).toBeFalsy()
    expect(R.getExn(result)).toBeTruthy()
  })
})
