import { AlchemyWallet } from '@echo-alchemy/types/model/alchemy-wallet'
import { PagingResult } from '@echo-alchemy/types/paging/paging-result'
import { GetOwnersForNftResponse } from '@echo-alchemy/types/response/get-owners-for-nft-response'
import { applySpec, map, pipe, prop } from 'ramda'

export function mapGetOwnersForNftResponse(response: GetOwnersForNftResponse): PagingResult<AlchemyWallet> {
  return applySpec({
    data: pipe(
      prop<string[]>('owners'),
      map((owner) => ({ address: owner, chainId: 1 }))
    ),
    pageKey: prop('pageKey')
  })(response)
}
