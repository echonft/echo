import { type AlchemyWallet } from '@echo/alchemy/types/model/alchemy-wallet'
import { type AlchemyPagingResult } from '@echo/alchemy/types/paging/alchemy-paging-result'
import { type GetOwnersForNftResponse } from '@echo/alchemy/types/response/get-owners-for-nft-response'
import { formatAddress } from '@echo/utils/helpers/format-address'
import { always, applySpec, map, partialRight, pipe, prop } from 'ramda'

export function mapGetOwnersForNftResponse(chainId: number) {
  return function (response: GetOwnersForNftResponse): AlchemyPagingResult<AlchemyWallet> {
    return applySpec<AlchemyPagingResult<AlchemyWallet>>({
      data: pipe(
        prop('owners'),
        map(
          applySpec<AlchemyWallet>({
            chainId: always(chainId),
            address: partialRight(formatAddress, [always(chainId)])
          })
        )
      ),
      pageKey: prop('pageKey')
    })(response)
  }
}
