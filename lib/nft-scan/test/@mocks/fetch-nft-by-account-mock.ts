import type { GetNftsByAccountRequest } from '@echo/nft-scan/types/request/get-nfts-by-account-request'
import type { GetNftsByAccountResponse } from '@echo/nft-scan/types/response/get-nfts-by-account-response'
import { pagedNftResponseMock } from '@echo/nft-scan-mocks/paged-nft-response-mock'
import { isNil } from 'ramda'

export async function fetchNftByAccountMock(args: GetNftsByAccountRequest): Promise<GetNftsByAccountResponse> {
  const { next } = args
  if (isNil(next)) {
    return Promise.resolve(pagedNftResponseMock()['0']!)
  }
  return Promise.resolve(pagedNftResponseMock()[next]!)
}
