import type { GetNftsByAccountQueryParams } from '@echo/nft-scan/types/query-params/get-nfts-by-account-query-params'
import type { GetNftsByAccountRequest } from '@echo/nft-scan/types/request/get-nfts-by-account-request'
import { always, applySpec, defaultTo, pipe, prop } from 'ramda'

export function mapGetNftsRequestToQueryStringParams(args: GetNftsByAccountRequest): GetNftsByAccountQueryParams {
  return applySpec<GetNftsByAccountQueryParams>({
    erc_type: always('erc721'),
    cursor: prop('next'),
    limit: prop('limit'),
    show_attribute: pipe(prop('showAttribute'), defaultTo(true))
  })(args)
}
