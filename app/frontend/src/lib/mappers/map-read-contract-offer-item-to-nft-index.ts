import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { NftIndex } from '@echo/model/types/nft'
import { getOrAddCollection } from '@echo/tasks/get-or-add-collection'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import type { ContractOfferItem } from '@echo/web3/types/contract-offer-item'
import { isNil } from 'ramda'

interface MapReadContractOfferItemToNftIndexArgs {
  readonly chain: ChainName
  readonly item: ContractOfferItem
}

/**
 * Maps a {@link ContractOfferItem} to {@link NftIndex}
 * @param args
 * @throws Error returns a rejected promise if the collection could not have been added
 */
export async function mapReadContractOfferItemToNftIndex(
  args: WithLoggerType<MapReadContractOfferItemToNftIndexArgs>
): Promise<NftIndex> {
  const { chain, item, logger } = args
  const collection = await getOrAddCollection({ contract: { address: item.tokenAddress, chain }, fetch, logger })
  if (isNil(collection)) {
    return Promise.reject(Error(`could not add collection for contract ${item.tokenAddress}`))
  }
  return getNftIndex({ collection, tokenId: item.tokenId })
}
