import { getNftBlurUrl } from '../nft/get-nft-blur-url'
import { getOpenSeaUrl } from '../nft/get-open-sea-url'
import { getNftCollectionByContract } from '../nft-collection/get-nft-collection-by-contract'
import { AlchemyNft } from '@echo/alchemy'
import { mapUserToUserDetails } from '@echo/firestore'
import { Nft, NftCollection, User, Wallet } from '@echo/firestore-types'
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
    owner: mapUserToUserDetails(user, userWallet)
  }
}
