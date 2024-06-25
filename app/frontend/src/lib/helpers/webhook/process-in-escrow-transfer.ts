import { addEscrowedNftWithId } from '@echo/firestore/crud/escrowed-nft/add-escrowed-nft-with-id'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { updateCollection } from '@echo/tasks/update-collection'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isNil } from 'ramda'

export async function processInEscrowTransfer(args: WithLoggerType<Record<'transfer', NftTransfer>>): Promise<void> {
  const {
    transfer: { contract, tokenId },
    logger
  } = args
  const collection = await updateCollection({ contract, logger })
  if (!isNil(collection)) {
    const nftIndex = getNftIndex({ collection, tokenId })
    const nftSnapshot = await getNftSnapshot(nftIndex)
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
