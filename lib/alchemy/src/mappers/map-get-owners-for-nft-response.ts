import { type AlchemyWallet } from '@echo/alchemy/types/model/alchemy-wallet'
import { type AlchemyPagingResult } from '@echo/alchemy/types/paging/alchemy-paging-result'
import { type GetOwnersForNftResponse } from '@echo/alchemy/types/response/get-owners-for-nft-response'
import { applySpec, map, pipe, prop } from 'ramda'

export function mapGetOwnersForNftResponse(chainId: number) {
  return function (response: GetOwnersForNftResponse): AlchemyPagingResult<AlchemyWallet> {
    return applySpec<AlchemyPagingResult<AlchemyWallet>>({
      data: pipe(
        prop('owners'),
        map((owner) => ({ address: owner, chainId }))
      ),
      pageKey: prop('pageKey')
    })(response)
  }
}
