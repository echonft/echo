import type { Contract } from '@echo/model/types/contract'
import type { Nft } from '@echo/model/types/nft'
import type { HexString } from '@echo/utils/types/hex-string'
import { applySpec, map, path, pipe, prop } from 'ramda'
import { encodeAbiParameters, keccak256, parseAbiParameters } from 'viem'

interface OfferItemAbi {
  readonly tokenAddress: HexString
  readonly tokenId: bigint
}

export function hashNfts(nfts: Nft[]): HexString {
  const params = parseAbiParameters(['struct OfferItem { address tokenAddress; uint256 tokenId; }', 'OfferItem[]'])
  return keccak256(
    encodeAbiParameters(params, [
      map(
        applySpec<OfferItemAbi>({
          tokenAddress: pipe<[Nft], Contract, HexString>(path(['collection', 'contract']), prop('address')),
          tokenId: prop('tokenId')
        })
      )(nfts)
    ])
  )
}
