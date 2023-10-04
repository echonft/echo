import { AlchemyWallet } from '@echo/alchemy/types/model/alchemy-wallet'
import { AlchemyPagingResult } from '@echo/alchemy/types/paging/alchemy-paging-result'
import { GetOwnersForNftResponse } from '@echo/alchemy/types/response/get-owners-for-nft-response'
import { applySpec, map, pipe, prop } from 'ramda'

export function mapGetOwnersForNftResponse(response: GetOwnersForNftResponse): AlchemyPagingResult<AlchemyWallet> {
  return applySpec<AlchemyPagingResult<AlchemyWallet>>({
    data: pipe(
      prop('owners'),
      map((owner) => ({ address: owner, chainId: 1 }))
    ),
    pageKey: prop('pageKey')
  })(response)
}
