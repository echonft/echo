import { deleteEscrowedNft } from '@echo/firestore/crud/escrowed-nft/delete-escrowed-nft'
import { getEscrowedNftSnapshot } from '@echo/firestore/crud/escrowed-nft/get-escrowed-nft'
import { addNftWithId } from '@echo/firestore/crud/nft/add-nft-with-id'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft } from '@echo/model/types/nft'
import { addCollection } from '@echo/tasks/add-collection'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isNil } from 'ramda'

export async function processOutEscrowTransfer(args: WithLoggerType<Record<'nft', Nft>>): Promise<void> {
  const {
    nft: {
      tokenId,
      collection: { contract },
      owner: { wallet }
    },
    logger
  } = args
  const collection = await addCollection({ contract, fetch, logger })
  if (!isNil(collection)) {
    const nftIndex = getNftIndex({ collection, tokenId })
    const nftSnapshot = await getEscrowedNftSnapshot(nftIndex)
    if (isNil(nftSnapshot)) {
      logger?.error({ fn: processOutEscrowTransfer.name, nft: nftIndex }, 'NFT not found')
      return
    }
    const to = await getWalletByAddress(wallet)
    // wallet is not in the database, we simply delete the NFT in that case
    if (isNil(to)) {
      logger?.warn({ fn: processOutEscrowTransfer.name, wallet }, 'target wallet not found in the database')
      await deleteEscrowedNft(nftSnapshot.id)
      logger?.warn({ fn: processOutEscrowTransfer.name, nft: nftIndex }, 'deleted escrowed NFT')
      return
    }
    const userDocumentData = await getUserById(to.userId)
    if (isNil(userDocumentData)) {
      logger?.error({ fn: processOutEscrowTransfer.name, user: { id: to.userId } }, 'user not found')
      return
    }
    const user = getUserFromFirestoreData({ user: userDocumentData, wallet: to })
    // We add NFT back in the NFT database and remove the escrowed one
    const nft: NftWithId = { ...nftSnapshot.data(), id: nftSnapshot.id, owner: user }
    await addNftWithId(nft)
    logger?.info({ fn: processOutEscrowTransfer.name, nft }, 'added NFT')
    await deleteEscrowedNft(nftSnapshot.id)
    logger?.info({ fn: processOutEscrowTransfer.name, nft: { id: nftSnapshot.id } }, 'deleted escrowed NFT')
  }
}
