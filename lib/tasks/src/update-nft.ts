import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft as updateNftInFirestore } from '@echo/firestore/crud/nft/update-nft'
import type { Collection } from '@echo/model/types/collection'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { User } from '@echo/model/types/user'
import { fetchNft } from '@echo/tasks/fetch-nft'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, assoc, ifElse, isNil, otherwise, pipe, tap } from 'ramda'

export interface UpdateNftArgs {
  nftIndex: NftIndex
  owner: User
  collection: Collection
}

/**
 * Adds an NFT to the DB if it doesn't exist, else it updates the ownership.
 * Will decide where to fetch the data based on chain. We use OpenSea API on testnet and NFTScan on mainnet
 */
export async function updateNft(args: WithLoggerType<UpdateNftArgs>) {
  const { nftIndex, owner, collection } = args
  const logger = args.logger?.child({ fn: updateNft.name })
  const nft = await pipe(getNft, otherwise(always(undefined)))(nftIndex)
  if (isNil(nft)) {
    await pipe(
      fetchNft,
      andThen(
        ifElse(
          isNil,
          tap(() => {
            logger?.error({ nft: nftIndex }, 'NFT not found in API')
          }),
          pipe(
            assoc('collection', collection),
            assoc('owner', owner),
            addNft,
            andThen(
              tap(({ id, data }) => {
                logger?.info({ nft: assoc('id', id, data) }, 'added NFT')
              })
            )
          )
        )
      ),
      otherwise((err) => {
        logger?.error({ err, nft: nftIndex }, 'could not fetch NFT')
      })
    )({
      fetch,
      identifier: nftIndex.tokenId.toString(),
      contract: collection.contract
    })
    return
  }
  await pipe(
    assoc('owner', owner),
    updateNftInFirestore,
    andThen(
      tap((nft) => {
        logger?.info({ nft }, 'updated NFT')
      })
    ),
    otherwise((err) => {
      logger?.error({ err, nft }, 'could not update NFT')
    })
  )(nft)
}
