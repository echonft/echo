import type { GetNftsByAccountRequest } from '@echo/opensea/types/request/get-nfts-by-account-request'

export type FetchNftsByAccountQueryParams = Pick<GetNftsByAccountRequest, 'next' | 'limit'>
