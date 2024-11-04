import type { Address } from '@echo/model/types/address'
import { getNft } from '@echo/nft-scan/services/get-nft'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { info } from '@echo/tasks/helpers/logger'
import type { Nullable } from '@echo/utils/types/nullable'

interface FetchNftArgs {
  contract: Address
  tokenId: number
}

/**
 * Fetches an NFT from the API
 * @param { contract, tokenId }
 */
export async function fetchNft({ contract, tokenId }: FetchNftArgs): Promise<Nullable<PartialNft>> {
  info({ nft: { collection: { contract }, tokenId } }, 'fetching NFT')
  return getNft({ contract, tokenId })
}
