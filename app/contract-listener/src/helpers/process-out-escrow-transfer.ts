import { getCollection } from '@echo/contract-listener/helpers/get-collection'
import type { EscrowData } from '@echo/contract-listener/types/escrow-data'
import { deleteEscrowedNft } from '@echo/firestore/crud/escrowed-nft/delete-escrowed-nft'
import { getEscrowedNftSnapshot } from '@echo/firestore/crud/escrowed-nft/get-escrowed-nft'
import { addNftWithId } from '@echo/firestore/crud/nft/add-nft-with-id'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isNil } from 'ramda'

export async function processOutEscrowTransfer(args: EscrowData): Promise<void> {
  const { contractAddress, chain, to, tokenId } = args
  pinoLogger.info(`[OUT_ESCROW transfer ${contractAddress}:${tokenId}] to wallet ${JSON.stringify(to)}, processing...`)
  try {
    const collection = await getCollection({ chain, address: contractAddress })
    const nftIndex = getNftIndex({ collection, tokenId })
    const nftSnapshot = await getEscrowedNftSnapshot(nftIndex)

    // Should not happen
    if (isNil(nftSnapshot)) {
      pinoLogger.error(`processOutEscrowTransfer error finding NFT ${contractAddress}:${tokenId}`)
      return
    }
    const nftData = nftSnapshot.data()
    const nft: NftWithId = { ...nftData, id: nftSnapshot.id }
    // We add NFT back in the NFT database and remove the escrowed one
    await addNftWithId(nft)
    await deleteEscrowedNft(nftSnapshot.id)
  } catch (err) {
    pinoLogger.error(`processOutEscrowTransfer error: ${errorMessage(err)}`)
  }
}
