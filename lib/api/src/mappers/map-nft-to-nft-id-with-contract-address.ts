import { NftIdWithContractAddress } from '../types/model/helper/nft-id-with-contract-address'
import { FirestoreNftData } from '@echo/firestore'

export function mapNftToNftIdWithContractAddress(nft: FirestoreNftData): NftIdWithContractAddress {
  return { tokenId: nft.tokenId, contractAddress: nft.collection.contract.address }
}
