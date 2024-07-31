import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Wallet } from '@echo/model/types/wallet'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { fetchNft } from '@echo/tasks/fetch-nft'
import { getOrAddCollection } from '@echo/tasks/get-or-add-collection'
import { andThen, assoc, isNil, otherwise, pipe, tap } from 'ramda'

export async function updateNftCommand(contract: Wallet, tokenId: string) {
  const logger = getLogger(updateNftCommand.name)
  await initializeFirebase()
  const nft = await pipe(
    fetchNft,
    andThen(
      tap((nft) => {
        if (isNil(nft)) {
          logger.warn({ nft: { collection: { contract }, tokenId } }, 'NFT not found')
        }
      })
    ),
    otherwise((err) => {
      logger.error({ err, nft: { collection: { contract }, tokenId } }, 'could not fetch NFT')
      return undefined
    })
  )({ contract, identifier: tokenId, fetch, logger })
  if (!isNil(nft)) {
    const collection = await pipe(
      getOrAddCollection,
      otherwise((err) => {
        logger.error({ err, collection: { contract } }, 'could not add collection')
        return undefined
      })
    )({ contract, fetch, logger })
    if (!isNil(collection)) {
      await pipe(
        updateNft,
        andThen((updatedNft) => {
          logger.info({ nft: updatedNft }, 'updated NFT')
        }),
        otherwise((err) => {
          logger.error({ err, nft: assoc('collection', collection, nft) }, 'could not update NFT')
        })
      )(assoc('collection', collection, nft))
    }
  }
}
