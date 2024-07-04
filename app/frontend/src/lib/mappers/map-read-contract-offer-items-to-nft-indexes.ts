import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { NftIndex } from '@echo/model/types/nft'
import { addCollection } from '@echo/tasks/add-collection'
import { getChain } from '@echo/utils/helpers/chains/get-chain'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import type { ContractOfferItems } from '@echo/web3/types/contract-offer-items'
import { isNil } from 'ramda'

interface MapReadContractsOfferItemsArgs {
  offerItems: ContractOfferItems
}
export async function mapReadContractOfferItemsToNftIndexes(
  args: WithLoggerType<MapReadContractsOfferItemsArgs>
): Promise<NftIndex[]> {
  const { logger, offerItems } = args
  const { chainId, items } = offerItems
  const chain = getChain(chainId)
  // TODO Beurk, can be done cleaner with FP
  const indexes = []
  for (const item of items) {
    const collection = await addCollection({ contract: { address: item.tokenAddress, chain }, fetch, logger })
    if (isNil(collection)) {
      throw new Error()
    }
    indexes.push(getNftIndex({ collection, tokenId: item.tokenId }))
  }
  return indexes
}
