import { type AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import { getUser } from '@echo/firestore/helpers/user/get-user'
import { type UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { type Collection } from '@echo/model/types/collection'
import { type Nft } from '@echo/model/types/nft'
import { type Wallet } from '@echo/model/types/wallet'
import { getNftBlurUrl } from '@echo/utils/helpers/nft/get-nft-blur-url'
import { getOpenSeaUrl } from '@echo/utils/helpers/nft/get-open-sea-url'
import { assoc, omit, pipe } from 'ramda'

export function mapAlchemyNftToFirestore(
  alchemyNft: AlchemyNft,
  user: UserDocumentData,
  wallet: Wallet,
  collection: Collection
) {
  const { contractAddress, chainId, tokenId } = alchemyNft
  return pipe(
    omit(['contractAddress', 'chainId']),
    assoc('blurUrl', getNftBlurUrl(contractAddress, tokenId)),
    assoc('openSeaUrl', getOpenSeaUrl(contractAddress, chainId, tokenId)),
    assoc('collection', collection),
    assoc('owner', getUser(user, wallet))
  )(alchemyNft) as Omit<Nft, 'id' | 'updatedAt'>
}
