import type { GetNftsByAccountQueryParams } from '@echo/nft-scan/types/query-params/get-nfts-by-account-query-params'
import type { GetNftsByAccountRequest } from '@echo/nft-scan/types/request/get-nfts-by-account-request'
import { always, applySpec, ifElse, isNil, pipe, prop } from 'ramda'

export function mapGetNftsRequestToQueryStringParams(args: GetNftsByAccountRequest): GetNftsByAccountQueryParams {
  return applySpec<GetNftsByAccountQueryParams>({
    erc_type: ifElse(pipe(prop('ercType'), isNil), always('erc721'), prop('ercType')),
    cursor: prop('cursor'),
    limit: prop('limit'),
    show_attribute: ifElse(pipe(prop('showAttribute'), isNil), always(true), prop('showAttribute'))
  })(args)
}
