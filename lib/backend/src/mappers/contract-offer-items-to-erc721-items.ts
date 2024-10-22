import { contractOfferItemToErc721Item } from '@echo/backend/mappers/contract-offer-item-to-erc721-item'
import type { Erc721ItemWithOwner } from '@echo/backend/types/erc721-item-with-owner'
import { nonEmptyMap } from '@echo/utils/fp/non-empty-map'
import { nonEmptyPromiseAll } from '@echo/utils/fp/non-empty-promise-all'
import { getChain } from '@echo/utils/helpers/chains/get-chain'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import type { ContractOfferItems } from '@echo/web3/types/contract-offer-items'
import { assoc, type NonEmptyArray, pipe, prop } from 'ramda'

export function contractOfferItemsToErc721Items(
  items: ContractOfferItems
): Promise<NonEmptyArray<Erc721ItemWithOwner>> {
  const chain = pipe(prop('chainId'), getChain)(items)
  return pipe<
    [ContractOfferItems],
    NonEmptyArray<ContractOfferItem>,
    NonEmptyArray<Promise<Erc721ItemWithOwner>>,
    Promise<NonEmptyArray<Erc721ItemWithOwner>>
  >(
    prop('items'),
    nonEmptyMap(pipe(assoc('chain', chain), contractOfferItemToErc721Item)),
    nonEmptyPromiseAll
  )(items)
}
