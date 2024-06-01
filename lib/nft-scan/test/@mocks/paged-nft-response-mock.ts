import type { GetNftsByAccountResponse } from '@echo/nft-scan/types/response/get-nfts-by-account-response'
import { nftResponseMock } from '@echo/nft-scan-mocks/nft-response-mock'

export function pagedNftResponseMock(): Record<string, GetNftsByAccountResponse> {
  return {
    '0': {
      total: 5,
      next: 'NS366537E64805D9BA',
      content: [nftResponseMock()['1']!]
    },
    NS366537E64805D9BA: {
      total: 5,
      next: 'NS60F1676E9200CC31',
      content: [nftResponseMock()['2']!]
    },
    NS60F1676E9200CC31: {
      total: 5,
      next: null,
      content: [nftResponseMock()['3']!]
    }
  }
}
