import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft as updateNftInFirestore } from '@echo/firestore/crud/nft/update-nft'
import type { Collection, Contract } from '@echo/model/types/collection'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { User } from '@echo/model/types/user'
import { getNft as getNftFromOpensea } from '@echo/opensea/services/get-nft'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { andThen, assoc, isNil, pipe, prop, tap } from 'ramda'

interface AddNftIfNeededArgs {
  nftIndex: NftIndex
  owner: User
  chain: ChainName
  collection: Collection
}

/**
 * Adds an NFT to the DB if it doesn't exist, else it updates the ownership.
 *
 * @param {AddNftIfNeededArgs} args - The arguments for adding the NFT.
 * @param {number} args.nftIndex - The index of the NFT.
 * @param {string} args.owner - The new owner of the NFT.
 * @param {string} args.chain - The chain where the NFT exists.
 * @param {Collection} args.collection - The collection to add the NFT to.
 */
export async function updateNft(args: AddNftIfNeededArgs) {
  const { nftIndex, owner, chain, collection } = args
  const nft = await getNft(nftIndex)

  if (!isNil(nft)) {
    pinoLogger.info(`NFT ${JSON.stringify(nftIndex)} already in database, updating owner...`)
    await pipe(assoc('owner', owner), updateNftInFirestore)(nft)
    pinoLogger.info(`NFT ${JSON.stringify(nftIndex)} owner updated to ${JSON.stringify(owner)}`)
    return
  }

  pinoLogger.info(`NFT ${JSON.stringify(nftIndex)} not found, fetching...`)
  await pipe(
    getNftFromOpensea,
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
    chain,
    fetch,
    identifier: nftIndex.tokenId.toString(),
    contract: pipe<[Collection], Contract, HexString>(prop('contract'), prop('address'))(collection)
  })
}
