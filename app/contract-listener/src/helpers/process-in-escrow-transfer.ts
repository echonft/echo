import { getCollection } from '@echo/contract-listener/helpers/get-collection'
import type { EscrowData } from '@echo/contract-listener/types/escrow-data'
import { addEscrowedNftWithId } from '@echo/firestore/crud/escrowed-nft/add-escrowed-nft-with-id'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isNil } from 'ramda'

export async function processInEscrowTransfer(args: EscrowData): Promise<void> {
  const { contractAddress, chain, from, tokenId } = args
  pinoLogger.info(
    `[IN_ESCROW transfer ${contractAddress}:${tokenId}] from wallet ${JSON.stringify(from)}, processing...`
  )
  try {
    const collection = await getCollection({ chain, address: contractAddress })
    const nftIndex = getNftIndex({ collection, tokenId })
    const nftSnapshot = await getNftSnapshot(nftIndex)

    // Should not happen
    if (isNil(nftSnapshot)) {
      pinoLogger.error(`processInEscrowTransfer error finding NFT ${contractAddress}:${tokenId}`)
      return
    }
    const nftData = nftSnapshot.data()
    const nft: NftWithId = { ...nftData, id: nftSnapshot.id }
    // We add the escrowed NFT with NFT data and remove it from the NFT database
    await addEscrowedNftWithId(nft)
    await deleteNft(nftSnapshot.id)
  } catch (err) {
    pinoLogger.error(`processInEscrowTransfer error: ${errorMessage(err)}`)
  }
}
