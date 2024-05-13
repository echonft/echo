import { fetchNftsByAccount, type FetchNftsByAccountArgs } from '@echo/opensea/fetchers/fetch-nfts-by-account'
import { handlePaging } from '@echo/opensea/helpers/handle-paging'
import type { PagingRequest } from '@echo/opensea/types/paging/paging-request'
import { assoc } from 'ramda'

export function getNftsByAccount(args: Omit<FetchNftsByAccountArgs, keyof PagingRequest>) {
  return handlePaging(fetchNftsByAccount, 'nfts', assoc('limit', 200, args))
}
