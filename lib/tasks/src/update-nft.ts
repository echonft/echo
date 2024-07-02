import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft as updateNftInFirestore } from '@echo/firestore/crud/nft/update-nft'
import type { Collection } from '@echo/model/types/collection'
import type { Nft, NftIndex } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { fetchNft } from '@echo/tasks/fetch-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, ifElse, isNil, otherwise, pipe, tap } from 'ramda'

export interface UpdateNftArgs {
  nftIndex: NftIndex
  owner: User
  collection: Collection
}

/**
 * Adds an NFT to the DB if it doesn't exist, else it updates the ownership.
 * Will decide where to fetch the data based on chain. We use OpenSea API on testnet and NFTScan on mainnet
 */
export async function updateNft(args: WithLoggerType<UpdateNftArgs>): Promise<Nullable<Nft>> {
  const { nftIndex, owner, collection } = args
  const logger = args.logger?.child({ fn: updateNft.name })
  const nft = await pipe(
    getNft,
    otherwise((err) => {
      logger?.error({ err, nft: nftIndex }, 'could not get NFT from Firestore')
      return undefined
    })
  )(nftIndex)
  if (isNil(nft)) {
    return await pipe(
      fetchNft,
      andThen(
        ifElse(
          isNil,
          () => {
            logger?.error({ nft: nftIndex }, 'NFT not found in API')
            return undefined
          },
          pipe(
            assoc('collection', collection),
            assoc('owner', owner),
            addNft,
            andThen(({ id, data }) => {
              const newNft = assoc('id', id, data)
              logger?.info({ nft: newNft }, 'added NFT')
              return newNft
            }),
            otherwise((err) => {
              logger?.error({ err, nft: nftIndex }, 'could not add NFT')
              return undefined
            })
          )
        )
      ),
      otherwise((err) => {
        logger?.error({ err, nft: nftIndex }, 'could not fetch NFT')
        return undefined
      })
    )({
      logger,
      fetch,
      identifier: nftIndex.tokenId.toString(),
      contract: collection.contract
    })
  }
  return await pipe(
    assoc('owner', owner),
    updateNftInFirestore,
    andThen(
      tap((nft) => {
        logger?.info({ nft }, 'updated NFT')
      })
    ),
    otherwise((err) => {
      logger?.error({ err, nft }, 'could not update NFT')
      return undefined
    })
  )(nft)
}
