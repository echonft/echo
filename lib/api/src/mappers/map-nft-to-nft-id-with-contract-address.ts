import { GetOwnersForNftRequest } from '@echo/alchemy'
import { FirestoreNftData } from '@echo/firestore'

export function mapNftToNftIdWithContractAddress(nft: FirestoreNftData): GetOwnersForNftRequest {
  return { tokenId: nft.tokenId, contractAddress: nft.collection.contract.address }
}
