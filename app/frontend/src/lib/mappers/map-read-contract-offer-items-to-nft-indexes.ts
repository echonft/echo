import { mapReadContractOfferItemToNftIndex } from '@echo/frontend/lib/mappers/map-read-contract-offer-item-to-nft-index'
import type { NftIndex } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { getChain } from '@echo/utils/helpers/chains/get-chain'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import type { ContractOfferItems } from '@echo/web3/types/contract-offer-items'
import { assoc, map, objOf, path, pipe } from 'ramda'

/**
 * Maps {@link ContractOfferItems} to {@link NftIndex}
 * @param args
 * @throws Error returns a rejected promise if the collection could not have been added for any of the items
 */
export function mapReadContractOfferItemsToNftIndexes(
  args: WithLoggerType<Record<'items', ContractOfferItems>>
): Promise<NftIndex[]> {
  const chain = getChain(args.items.chainId)
  return pipe(
    nonNullableReturn(path(['items', 'items'])),
    map<ContractOfferItem, Promise<NftIndex>>(
      pipe(objOf('item'), assoc('chain', chain), assoc('logger', args.logger), mapReadContractOfferItemToNftIndex)
    ),
    promiseAll
  )(args)
}
