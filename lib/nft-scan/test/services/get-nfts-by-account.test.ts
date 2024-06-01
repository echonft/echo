import { fetchNftByAccount } from '@echo/nft-scan/fetchers/fetch-nft-by-account'
import { getNftsByAccount, type GetNftsByAccountArgs } from '@echo/nft-scan/services/get-nfts-by-account'
import { fetchNftMock } from '@echo/nft-scan-mocks/fetch-nft-mock'
import { nftMock } from '@echo/nft-scan-mocks/nft-mock'
import { CHAIN_BLAST } from '@echo/utils/constants/chains/chains'
import { describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/nft-scan/fetchers/fetch-nft-by-account')

describe('services - getNftsByAccount', () => {
  it('maps properly with paging', async () => {
    jest.mocked(fetchNft).mockImplementation(fetchNftMock)
    const expectedResult = [nftMock()['1']!, nftMock()['2']!, nftMock()['3']!]
    const result = await getNftsByAccount({
      accountAddress: '0xtest',
      chain: CHAIN_BLAST
    } as unknown as GetNftsByAccountArgs)

    expect(result).toEqual(expectedResult)
  })
})
