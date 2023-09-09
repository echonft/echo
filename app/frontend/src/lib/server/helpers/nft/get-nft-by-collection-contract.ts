import { ServerError } from '../error/server-error'
import { findNftByCollectionContract } from '@echo/firestore'

export async function getNftByCollectionContract(contractAddress: string, chainId: number, tokenId: number) {
  try {
    return await findNftByCollectionContract(contractAddress, chainId, tokenId)
  } catch (e) {
    throw new ServerError(
      `error getting nft with tokenId ${tokenId} for collection with address ${contractAddress} on chain id ${chainId}`,
      e
    )
  }
}
