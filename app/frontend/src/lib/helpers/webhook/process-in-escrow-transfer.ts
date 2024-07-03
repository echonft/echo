import { addEscrowedNftWithId } from '@echo/firestore/crud/escrowed-nft/add-escrowed-nft-with-id'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshotForIndex } from '@echo/firestore/crud/nft/get-nft'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { addCollection } from '@echo/tasks/add-collection'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isNil } from 'ramda'

export async function processInEscrowTransfer(args: WithLoggerType<Record<'nft', Nft>>): Promise<void> {
  const {
    nft: {
      tokenId,
      collection: { contract }
    },
    logger
  } = args
  const collection = await addCollection({ contract, fetch, logger })
  if (!isNil(collection)) {
    const nftIndex = getNftIndex({ collection, tokenId })
    const nftSnapshot = await getNftSnapshotForIndex(nftIndex)
    if (isNil(nftSnapshot)) {
      logger?.error({ fn: processInEscrowTransfer.name, nft: nftIndex }, 'NFT not found')
      return
    }
    const nftData = nftSnapshot.data()
    const nft: NftWithId = { ...nftData, id: nftSnapshot.id }
    // We add the escrowed NFT with NFT data and remove it from the NFT database
    await addEscrowedNftWithId(nft)
    logger?.info({ fn: processInEscrowTransfer.name, nft }, 'added escrowed NFT')
    await deleteNft(nftSnapshot.id)
    logger?.info({ fn: processInEscrowTransfer.name, nft: nftIndex }, 'deleted NFT')
  }
}
