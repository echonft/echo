import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Wallet } from '@echo/model/types/wallet'
import { addCollection } from '@echo/tasks/add-collection'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { fetchNft } from '@echo/tasks/fetch-nft'
import { andThen, assoc, isNil, otherwise, pipe } from 'ramda'

export async function updateNftCommand(contract: Wallet, tokenId: string) {
  const logger = getLogger(updateNftCommand.name)
  await initializeFirebase()
  const nft = await fetchNft({ contract, identifier: tokenId, fetch, logger })
  if (isNil(nft)) {
    logger.error({ nft: { collection: { contract }, tokenId } }, 'could not fetch NFT')
    return
  }
  const collection = await addCollection({ contract, fetch, logger })
  if (isNil(collection)) {
    logger.error({ collection: { contract } }, 'could not fetch collection')
    return
  }
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
