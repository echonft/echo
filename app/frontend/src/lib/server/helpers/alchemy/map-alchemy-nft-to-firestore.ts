import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import { mapUserToUserDetails } from '@echo/firestore/mappers/map-user-to-user-details'
import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { modifyStringPropToUrl } from '@echo/utils/fp/modify-string-prop-to-url'
import { getCollectionByContract } from '@server/helpers/collection/get-collection-by-contract'
import { getNftBlurUrl } from '@server/helpers/nft/get-nft-blur-url'
import { getOpenSeaUrl } from '@server/helpers/nft/get-open-sea-url'
import { isNil, omit, pipe } from 'ramda'

export const mapAlchemyNftToFirestore = (
  alchemyNft: AlchemyNft,
  user: Partial<FirestoreUser>,
  userFirestoreWallet: FirestoreWallet,
  collections: FirestoreNftCollection[]
): Omit<FirestoreNft, 'id'> => {
  const { contractAddress, chainId, tokenId } = alchemyNft
  const collection = getCollectionByContract(contractAddress, chainId, collections)!
  if (isNil(collection)) {
    throw Error(`collection address: ${contractAddress} chainId: ${chainId} not found`)
  }
  const partialNft = pipe(
    modifyStringPropToUrl<'pictureUrl', AlchemyNft>('pictureUrl'),
    modifyStringPropToUrl<'thumbnailUrl', AlchemyNft>('thumbnailUrl'),
    omit(['contractAddress', 'chainId'])
  )(alchemyNft)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return {
    ...partialNft,
    blurUrl: getNftBlurUrl(contractAddress, tokenId),
    openSeaUrl: getOpenSeaUrl(contractAddress, chainId, tokenId),
    collection,
    owner: mapUserToUserDetails(user, userFirestoreWallet)
  }
}
