import type { FetchNftsByAccountRequest } from '@echo/opensea/types/request/fetch-nfts-by-account-request'

export type PagingQueryParams = Pick<FetchNftsByAccountRequest, 'next' | 'limit'>
