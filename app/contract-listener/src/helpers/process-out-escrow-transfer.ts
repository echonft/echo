import { getCollection } from '@echo/contract-listener/helpers/get-collection'
import { loggers } from '@echo/contract-listener/index'
import type { EscrowData } from '@echo/contract-listener/types/escrow-data'
import { deleteEscrowedNft } from '@echo/firestore/crud/escrowed-nft/delete-escrowed-nft'
import { getEscrowedNftSnapshot } from '@echo/firestore/crud/escrowed-nft/get-escrowed-nft'
import { addNftWithId } from '@echo/firestore/crud/nft/add-nft-with-id'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { isNil, toLower } from 'ramda'

export async function processOutEscrowTransfer(args: EscrowData): Promise<void> {
  const logger = loggers.get(args.chain)
  const fn = 'processOutEscrowTransfer'
  const { contractAddress, chain, to: toAddress, tokenId } = args
  logger?.info(
    { fn, nft_data: { contract: contractAddress, tokenId }, toAddress },
    'outbound escrow transfer processing...'
  )
  // Need to fetch the user data to change ownership
  const to = await getWalletByAddress({ chain, address: toLower(toAddress) })
  const userDocumentData = to && (await getUserById(to.userId))
  const user = userDocumentData && getUserFromFirestoreData(userDocumentData, to)
  const collection = await getCollection({ chain, address: contractAddress })
  const nftIndex = getNftIndex({ collection, tokenId })
  const nftSnapshot = await getEscrowedNftSnapshot(nftIndex)

  // Should not happen
  if (isNil(nftSnapshot)) {
    logger?.error({ fn, nft_data: { contract: contractAddress, tokenId } }, 'NFT not found')
    return
  }
  const nftData = nftSnapshot.data()

  // If the user is not found after the transaction, it means he is not in the Echo database
  // We simply delete the NFT in that case
  if (isNil(user)) {
    await deleteEscrowedNft(nftSnapshot.id)
  } else {
    const nft: NftWithId = { ...nftData, id: nftSnapshot.id, owner: user }
    // We add NFT back in the NFT database and remove the escrowed one
    await addNftWithId(nft)
    await deleteEscrowedNft(nftSnapshot.id)
  }
}
