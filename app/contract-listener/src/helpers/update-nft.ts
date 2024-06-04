import { updateNftMainnet } from '@echo/contract-listener/helpers/update-nft-mainnet'
import { updateNftTestnet } from '@echo/contract-listener/helpers/update-nft-testnet'
import type { Collection } from '@echo/model/types/collection'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { User } from '@echo/model/types/user'
import { isTestnetChain } from '@echo/utils/helpers/is-testnet-chain'
import type { ChainName } from '@echo/utils/types/chain-name'

export interface UpdateNftArgs {
  nftIndex: NftIndex
  owner: User
  chain: ChainName
  collection: Collection
}

/**
 * Adds an NFT to the DB if it doesn't exist, else it updates the ownership.
 *
 * @param {UpdateNftArgs} args - The arguments for adding the NFT.
 * @param {number} args.nftIndex - The index of the NFT.
 * @param {string} args.owner - The new owner of the NFT.
 * @param {string} args.chain - The chain where the NFT exists.
 * @param {Collection} args.collection - The collection to add the NFT to.
 */
export async function updateNft(args: UpdateNftArgs) {
  if (isTestnetChain(args.chain)) {
    return updateNftTestnet(args)
  }
  return updateNftMainnet(args)
}
