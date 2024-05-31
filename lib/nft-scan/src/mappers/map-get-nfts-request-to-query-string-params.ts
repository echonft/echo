import type { GetNftsByAccountQueryParams } from '@echo/nft-scan/types/query-params/get-nfts-by-account-query-params'
import type { GetNftsByAccountRequest } from '@echo/nft-scan/types/request/get-nfts-by-account-request'
import { applySpec, defaultTo, pipe, prop } from 'ramda'

export function mapGetNftsRequestToQueryStringParams(args: GetNftsByAccountRequest): GetNftsByAccountQueryParams {
  return applySpec<GetNftsByAccountQueryParams>({
    erc_type: pipe(prop('ercType'), defaultTo('erc721')),
    cursor: prop('cursor'),
    limit: prop('limit'),
    show_attribute: pipe(prop('showAttribute'), defaultTo(true))
  })(args)
}
