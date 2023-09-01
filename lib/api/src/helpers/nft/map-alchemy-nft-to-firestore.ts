import { getNftCollectionByContract } from '../nft-collection/get-nft-collection-by-contract'
import { getNftBlurUrl } from './get-nft-blur-url'
import { getOpenSeaUrl } from './get-open-sea-url'
import { AlchemyNft } from '@echo/alchemy'
import { mapUserToUserDetails, Nft, NftCollection, User, Wallet } from '@echo/firestore'
import { modifyStringPropToUrl } from '@echo/utils'
import { isNil, omit, pipe } from 'ramda'

export const mapAlchemyNftToFirestore = (
  alchemyNft: AlchemyNft,
  user: User,
  userWallet: Wallet,
  collections: NftCollection[]
): Omit<Nft, 'id'> => {
  const { contractAddress, chainId, tokenId } = alchemyNft
  const collection = getNftCollectionByContract(contractAddress, chainId, collections)!
  if (isNil(collection)) {
    throw Error(`collection address: ${contractAddress} chainId: ${chainId} not found`)
  }
  const partialNft = pipe(
    omit(['contractAddress', 'chainId']),
    modifyStringPropToUrl('pictureUrl'),
    modifyStringPropToUrl('thumbnailUrl')
  )(alchemyNft)

  return {
    ...partialNft,
    blurUrl: getNftBlurUrl(contractAddress, tokenId),
    openSeaUrl: getOpenSeaUrl(contractAddress, chainId, tokenId),
    collection,
    owner: mapUserToUserDetails(user, userWallet)
  }
}
