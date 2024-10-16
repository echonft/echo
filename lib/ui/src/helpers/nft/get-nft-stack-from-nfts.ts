import type { Nft } from '@echo/model/types/nft/nft'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { always, applySpec, head, pipe, prop } from 'ramda'

export function getNftStackFromNfts(nfts: Nft[]): NftStack {
  return pipe(
    head,
    applySpec<NftStack>({
      owner: prop('owner'),
      collection: prop('collection'),
      pictureUrl: prop('pictureUrl'),
      tokenId: prop('tokenIdLabel'),
      nfts: always(nfts)
    })
  )(nfts)
}
