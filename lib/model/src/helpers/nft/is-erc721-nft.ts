import { TokenType } from '@echo/model/constants/token-type'
import type { Erc721Nft, Nft, OwnedErc721Nft, OwnedNft } from '@echo/model/types/nft'
import { propEq } from 'ramda'

export function isErc721Nft(nft: Nft): nft is Erc721Nft
export function isErc721Nft(nft: OwnedNft): nft is OwnedErc721Nft
export function isErc721Nft(nft: Nft | OwnedNft): nft is Erc721Nft | OwnedErc721Nft {
  return propEq(TokenType.Erc721, 'type', nft)
}
