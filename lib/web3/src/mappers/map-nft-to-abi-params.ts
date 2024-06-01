import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { HexString } from '@echo/utils/types/hex-string'
import type { OfferItemAbi } from '@echo/web3/types/offer-item-abi'
import { applySpec, path, pipe, prop } from 'ramda'

export function mapNftToAbiParams(nft: Nft): OfferItemAbi {
  return applySpec<OfferItemAbi>({
    tokenAddress: pipe<[Nft], Wallet, HexString>(nonNullableReturn(path(['collection', 'contract'])), prop('address')),
    tokenId: prop('tokenId')
  })(nft)
}
