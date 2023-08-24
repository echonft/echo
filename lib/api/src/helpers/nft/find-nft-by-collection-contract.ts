import { ApiError } from '../api-error'
import { findNftByCollectionContract as firestoreFindNftByCollectionContract } from '@echo/firestore'

export const findNftByCollectionContract = async (contractAddress: string, chainId: number, tokenId: number) => {
  try {
    return await firestoreFindNftByCollectionContract(contractAddress, chainId, tokenId)
  } catch (e) {
    throw new ApiError(500, 'Error fetching NFT')
  }
}
