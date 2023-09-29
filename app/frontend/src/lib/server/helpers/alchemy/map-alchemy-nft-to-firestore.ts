import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import { getUserDetails } from '@echo/firestore/helpers/user/get-user-details'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'
import { modifyStringPropToUrl } from '@echo/utils/fp/modify-string-prop-to-url'
import { getNftBlurUrl } from '@server/helpers/nft/get-nft-blur-url'
import { getOpenSeaUrl } from '@server/helpers/nft/get-open-sea-url'
import { omit, pipe } from 'ramda'

export function mapAlchemyNftToFirestore(
  alchemyNft: AlchemyNft,
  user: FirestoreUser,
  wallet: WalletData,
  collection: FirestoreNftCollection
) {
  const { contractAddress, chainId, tokenId } = alchemyNft
  const partialNft = pipe(
    modifyStringPropToUrl<'pictureUrl', AlchemyNft>('pictureUrl'),
    modifyStringPropToUrl<'thumbnailUrl', AlchemyNft & Record<'pictureUrl', URL | undefined>>('thumbnailUrl'),
    omit(['contractAddress', 'chainId'])
  )(alchemyNft) as Partial<FirestoreNft>

  return {
    ...partialNft,
    blurUrl: getNftBlurUrl(contractAddress, tokenId),
    openSeaUrl: getOpenSeaUrl(contractAddress, chainId, tokenId),
    collection,
    owner: getUserDetails(user, wallet)
  } as Omit<FirestoreNft, 'id'>
}
