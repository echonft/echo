import type { Address } from '@echo/model/types/address'
import { getNftsByCollectionContract } from '@echo/nft-scan/services/get-nfts-by-collection-contract'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'

/**
 * Fetches NFTs from the API and groups them by collection
 * @param contract
 */
export function fetchNftsByCollectionContract(contract: Address): Promise<PartialNft[]> {
  return getNftsByCollectionContract(contract)
}
