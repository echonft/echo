import type { Contract } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { HexString } from '@echo/utils/types/hex-string'
import type { OfferItemAbi } from '@echo/web3/types/offer-item-abi'
import { applySpec, head, path, pipe, prop } from 'ramda'

export function mapNftToAbiParams(nft: Nft): OfferItemAbi {
  return applySpec<OfferItemAbi>({
    tokenAddress: pipe<[Nft], Contract[], Contract, HexString>(
      // FIXME Contract[] Not sure if thats the proper behaviour
      nonNullableReturn(path(['collection', 'contracts'])),
      head,
      prop('address')
    ),
    tokenId: prop('tokenId')
  })(nft)
}
