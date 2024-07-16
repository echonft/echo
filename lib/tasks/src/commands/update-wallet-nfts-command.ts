import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Wallet } from '@echo/model/types/wallet'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { updateNftsForWallet } from '@echo/tasks/update-nfts-for-wallet'
import { andThen, isNil, otherwise, pipe, tap } from 'ramda'

export async function updateWalletNftsCommand(wallet: Wallet) {
  const logger = getLogger(updateWalletNftsCommand.name)
  await initializeFirebase()
  const walletDocumentData = await pipe(
    getWalletByAddress,
    andThen(
      tap((wallet) => {
        if (isNil(wallet)) {
          logger.error({ wallet }, 'wallet not found')
        }
      })
    ),
    otherwise((err) => {
      logger.error({ err, wallet }, 'could not fetch wallet from Firestore')
      return undefined
    })
  )(wallet)
  if (!isNil(walletDocumentData)) {
    await pipe(
      updateNftsForWallet,
      andThen(() => {
        logger.info({ wallet }, 'updated NFTs for wallet')
      }),
      otherwise((err) => {
        logger.error({ err, wallet }, 'could not update NFTs')
      })
    )({ wallet: walletDocumentData, fetch, logger })
  }
}
