import { getCollection } from '@echo/contract-listener/helpers/get-collection'
import type { EscrowData } from '@echo/contract-listener/types/escrow-data'
import { deleteEscrowedNft } from '@echo/firestore/crud/escrowed-nft/delete-escrowed-nft'
import { getEscrowedNftSnapshot } from '@echo/firestore/crud/escrowed-nft/get-escrowed-nft'
import { addNftWithId } from '@echo/firestore/crud/nft/add-nft-with-id'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isNil, toLower } from 'ramda'

export async function processOutEscrowTransfer(args: EscrowData): Promise<void> {
  const { contractAddress, chain, to: toAddress, tokenId } = args
  pinoLogger.info(
    `[OUT_ESCROW transfer ${contractAddress}:${tokenId}] to wallet ${JSON.stringify(toAddress)}, processing...`
  )
  try {
    // Need to fetch the user data to change ownership
    const to = await getWalletByAddress({ chain, address: toLower(toAddress) })
    const userDocumentData = to && (await getUserById(to.userId))
    const user = userDocumentData && getUserFromFirestoreData(userDocumentData, to)
    const collection = await getCollection({ chain, address: contractAddress })
    const nftIndex = getNftIndex({ collection, tokenId })
    const nftSnapshot = await getEscrowedNftSnapshot(nftIndex)

    // Should not happen
    if (isNil(nftSnapshot)) {
      pinoLogger.error(`processOutEscrowTransfer error finding NFT ${contractAddress}:${tokenId}`)
      return
    }
    const nftData = nftSnapshot.data()
    // We make a check on if to is nil, it should never happen.
    // In that case, we simply put the NFT back to who it was before
    // TODO We need to make sure this doesnt lead to some issues
    //  in the frontend (where a user has an NFT he doesnt really own)
    const nft: NftWithId = isNil(user)
      ? { ...nftData, id: nftSnapshot.id }
      : { ...nftData, id: nftSnapshot.id, owner: user }
    // We add NFT back in the NFT database and remove the escrowed one
    await addNftWithId(nft)
    await deleteEscrowedNft(nftSnapshot.id)
  } catch (err) {
    pinoLogger.error(`processOutEscrowTransfer error: ${errorMessage(err)}`)
  }
}
