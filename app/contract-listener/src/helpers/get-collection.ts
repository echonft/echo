import { getCollectionMainnet } from '@echo/contract-listener/helpers/get-collection-mainnet'
import { getCollectionTestnet } from '@echo/contract-listener/helpers/get-collection-testnet'
import type { Collection } from '@echo/model/types/collection'
import type { GetContractRequest } from '@echo/opensea/types/request/get-contract-request'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { WithLoggerType } from '@echo/utils/types/with-logger'

/**
 * Returns the collection for a given NFT.
 * Adds the collection if it does not exist already.
 *
 * @param {Omit<GetContractRequest, 'fetch'>} args
 * @return {Promise<Collection>} - The existing or newly created collection.
 */
export async function getCollection(args: WithLoggerType<Omit<GetContractRequest, 'fetch'>>): Promise<Collection> {
  if (isTestnetChain(args.chain)) {
    return getCollectionTestnet(args)
  }
  return getCollectionMainnet(args)
}
