import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft as updateNftInFirestore } from '@echo/firestore/crud/nft/update-nft'
import type { Collection } from '@echo/model/types/collection'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { User } from '@echo/model/types/user'
import { getNft as getNftFromNftScan } from '@echo/nft-scan/services/get-nft'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { ChainName } from '@echo/utils/types/chain-name'
import { andThen, assoc, isNil, pipe, tap } from 'ramda'

interface UpdateNftArgs {
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
  const { nftIndex, owner, collection } = args
  const nft = await getNft(nftIndex)

  if (!isNil(nft)) {
    pinoLogger.info(`NFT ${JSON.stringify(nftIndex)} already in database, updating owner...`)
    await pipe(assoc('owner', owner), updateNftInFirestore)(nft)
    pinoLogger.info(`NFT ${JSON.stringify(nftIndex)} owner updated to ${JSON.stringify(owner)}`)
    return
  }

  pinoLogger.info(`NFT ${JSON.stringify(nftIndex)} not found, fetching...`)
  await pipe(
    // TODO Need to add testnet
    getNftFromNftScan,
    andThen(
      pipe(
        assoc('collection', collection),
        assoc('owner', owner),
        addNft,
        andThen(
          tap(({ id }) => {
            pinoLogger.info(`Added NFT ${id}`)
          })
        )
      )
    )
  )({
    fetch,
    identifier: nftIndex.tokenId.toString(),
    contract: collection.contract
  })
}
