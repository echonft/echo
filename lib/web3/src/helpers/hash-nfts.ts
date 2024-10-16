import type { Nft } from '@echo/model/types/nft/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { HexString } from '@echo/utils/types/hex-string'
import type { OfferItemAbi } from '@echo/web3/types/offer-item-abi'
import { applySpec, map, path, pipe, prop } from 'ramda'
import { encodeAbiParameters, keccak256, parseAbiParameters } from 'viem'

export function hashNfts(nfts: Nft[]): HexString {
  const params = parseAbiParameters(['struct OfferItem { address tokenAddress; uint256 tokenId; }', 'OfferItem[]'])
  return keccak256(
    encodeAbiParameters(params, [
      map(
        applySpec<OfferItemAbi>({
          tokenAddress: pipe<[Nft], Wallet, HexString>(
            nonNullableReturn(path(['collection', 'contract'])),
            prop('address')
          ),
          tokenId: prop('tokenId')
        })
      )(nfts)
    ])
  )
}
