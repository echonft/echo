import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { Wallet } from '@echo/model/types/wallet'
import { addCollectionIfNeeded } from '@echo/opensea-stream/helpers/add-collection-if-needed'
import { addNftIfNeeded } from '@echo/opensea-stream/helpers/add-nft-if-needed'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { isNil } from 'ramda'

/**
 * Processes a swap transfer (from and to are on Echo)
 * Will modify NFT ownership if it's in our DB, else it will create the data
 *
 * @param {Wallet} to - The receiving wallet.
 * @param {NftIndex} nftIndex - The index of the NFT being transferred.
 */
export async function processSwapTransfer(to: Wallet, nftIndex: NftIndex) {
  const walletData = await getWalletByAddress(to)
  if (isNil(walletData)) {
    pinoLogger.error(`wallet ${JSON.stringify(to)} not found`)
    return
  }
  const userDocumentData = await getUserById(walletData.userId)
  if (isNil(userDocumentData)) {
    pinoLogger.error(`user with id ${walletData.userId} not found`)
    return
  }
  const user = getUserFromFirestoreData(userDocumentData, walletData)
  const collection = await addCollectionIfNeeded(nftIndex.collection.slug)
  await addNftIfNeeded({ nftIndex, owner: user, collection, chain: to.chain })
}
