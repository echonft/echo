import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import { getUserDetails } from '@echo/firestore/helpers/user/get-user-details'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'
import { getNftBlurUrl } from '@server/helpers/nft/get-nft-blur-url'
import { getOpenSeaUrl } from '@server/helpers/nft/get-open-sea-url'
import { assoc, omit, pipe } from 'ramda'

export function mapAlchemyNftToFirestore(
  alchemyNft: AlchemyNft,
  user: FirestoreUser,
  wallet: WalletData,
  collection: FirestoreNftCollection
) {
  const { contractAddress, chainId, tokenId } = alchemyNft
  return pipe(
    omit(['contractAddress', 'chainId']),
    assoc('blurUrl', getNftBlurUrl(contractAddress, tokenId)),
    assoc('openSeaUrl', getOpenSeaUrl(contractAddress, chainId, tokenId)),
    assoc('collection', collection),
    assoc('owner', getUserDetails(user, wallet))
  )(alchemyNft) as Omit<FirestoreNft, 'id' | 'updatedAt'>
}
