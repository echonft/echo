import { getNftCollectionByContract } from '../nft-collection/get-nft-collection-by-contract'
import { getNftBlurUrl } from './get-nft-blur-url'
import { getOpenSeaUrl } from './get-open-sea-url'
import { GetNftResponse } from '@echo/alchemy'
import { mapUserToUserDetails, Nft, NftCollection, User, Wallet } from '@echo/firestore'
import { isNil, omit } from 'ramda'

export const mapAlchemyNftToFirestore = (
  alchemyNft: GetNftResponse,
  user: User,
  userWallet: Wallet,
  collections: NftCollection[]
): Omit<Nft, 'id'> => {
  const { contractAddress, chainId, tokenId } = alchemyNft
  const collection = getNftCollectionByContract(contractAddress, chainId, collections)!
  if (isNil(collection)) {
    throw Error(`collection address: ${contractAddress} chainId: ${chainId} not found`)
  }
  return {
    ...omit(['contractAddress', 'chainId'], alchemyNft),
    blurUrl: getNftBlurUrl(contractAddress, tokenId),
    openSeaUrl: getOpenSeaUrl(contractAddress, chainId, tokenId),
    collection,
    owner: mapUserToUserDetails(user, userWallet)
  }
}
