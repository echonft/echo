import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import { getNftBlurUrl } from '@echo/model/helpers/nft/get-nft-blur-url'
import { getOpenSeaUrl } from '@echo/model/helpers/nft/get-open-sea-url'
import { type Collection } from '@echo/model/types/collection'
import { type Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { assoc, omit, pipe } from 'ramda'

export function mapAlchemyNftToNft(alchemyNft: AlchemyNft, user: User, collection: Collection) {
  const { contractAddress, chainId, tokenId } = alchemyNft
  return pipe(
    omit(['contractAddress', 'chainId']),
    assoc('blurUrl', getNftBlurUrl(contractAddress, tokenId)),
    assoc('openSeaUrl', getOpenSeaUrl(contractAddress, chainId, tokenId)),
    assoc('collection', collection),
    assoc('owner', user)
  )(alchemyNft) as Omit<Nft, 'id' | 'updatedAt'>
}
