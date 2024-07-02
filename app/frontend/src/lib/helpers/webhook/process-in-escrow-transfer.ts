import { addEscrowedNftWithId } from '@echo/firestore/crud/escrowed-nft/add-escrowed-nft-with-id'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshotForIndex } from '@echo/firestore/crud/nft/get-nft'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft } from '@echo/model/types/nft'
import { addCollection } from '@echo/tasks/add-collection'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isNil, otherwise, pipe } from 'ramda'

export async function processInEscrowTransfer(args: WithLoggerType<Record<'nft', Nft>>): Promise<void> {
  const logger = args.logger?.child({ fn: processInEscrowTransfer.name })
  const {
    nft: {
      tokenId,
      collection: { contract }
    },
    logger
  } = args
  const collection = await pipe(
    addCollection,
    otherwise((err) => {
      logger?.error({ err, collection: { contract } }, 'could not add collection')
      return undefined
    })
  )({ contract, fetch, logger })
  if (!isNil(collection)) {
    const nftIndex = getNftIndex({ collection, tokenId })
    const nftSnapshot = await pipe(
      getNftSnapshotForIndex,
      otherwise((err) => {
        logger?.error({ err, nft: nftIndex }, 'could get NFT snapshot')
      })
    )(nftIndex)
    if (!isNil(nftSnapshot)) {
      const nftData = nftSnapshot.data()
      const nft: NftWithId = { ...nftData, id: nftSnapshot.id }
      // We add the escrowed NFT with NFT data and remove it from the NFT database
      await pipe(
        addEscrowedNftWithId,
        otherwise((err) => {
          logger?.error({ err, nft }, 'could not add escrowed NFT')
        })
      )(nft)
      logger?.info({ nft }, 'added escrowed NFT')
      await pipe(
        deleteNft,
        otherwise((err) => {
          logger?.error({ err, nft: nftIndex }, 'could not delete NFT')
        })
      )(nftSnapshot.id)
      logger?.info({ nft: nftIndex }, 'deleted NFT')
    }
  }
}
