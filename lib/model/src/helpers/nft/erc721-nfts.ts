import { isErc721Nft } from '@echo/model/helpers/nft/is-erc721-nft'
import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import type { Nft } from '@echo/model/types/nft/nft'
import { filter } from 'ramda'

export function erc721Nfts(nfts: Nft[]): Erc721Nft[] {
  return filter(isErc721Nft, nfts)
}
