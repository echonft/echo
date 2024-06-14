import { getCollectionMainnet } from '@echo/frontend/lib/helpers/webhook/get-collection-mainnet'
import { getCollectionTestnet } from '@echo/frontend/lib/helpers/webhook/get-collection-testnet'
import type { Collection } from '@echo/model/types/collection'
import type { GetContractRequest } from '@echo/opensea/types/request/get-contract-request'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'

/**
 * Returns the collection for a given NFT. Will decide where to fetch the data based on chain
 * We use OpenSea API on testnet and NFTScan on mainnet
 * Adds the collection if it does not exist already.
 *
 * @param {Omit<GetContractRequest, 'fetch'>} args
 * @return {Promise<Collection>} - The existing or newly created collection.
 */
export async function getCollectionSwitch(args: Omit<GetContractRequest, 'fetch'>): Promise<Collection> {
  if (isTestnetChain(args.chain)) {
    return getCollectionTestnet(args)
  }
  return getCollectionMainnet(args)
}
