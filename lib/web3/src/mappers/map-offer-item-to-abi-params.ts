import type { Nft } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { formatAddress } from '@echo/web3/helpers/format-address'
import type { OfferItemAbi } from '@echo/web3/types/offer-item-abi'
import { applySpec, construct, path, pipe, prop } from 'ramda'

export function mapOfferItemToAbiParams(item: Nft): OfferItemAbi {
  const BigIntConstructor = construct(BigInt)
  return applySpec<OfferItemAbi>({
    tokenAddress: pipe(nonNullableReturn(path(['collection', 'contract'])), formatAddress),
    tokenId: pipe<[Nft], number, bigint>(prop('tokenId'), BigIntConstructor)
  })(item)
}
