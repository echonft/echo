import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import type { Wallet } from '@echo/model/types/wallet'
import { updateNftsForWallet } from '@echo/tasks/update-nfts-for-wallet'
import { getBaseLogger } from '@echo/utils/services/logger'
import { isNil } from 'ramda'

export async function updateWalletNftsCommand(wallet: Wallet) {
  const logger = getBaseLogger('UpdateWalletNftsCommand', { serializers: modelLoggerSerializers })
  await initializeFirebase()
  const walletDocumentData = await getWalletByAddress(wallet)
  if (isNil(walletDocumentData)) {
    logger.error({ wallet }, 'wallet not found')
    return
  }
  logger.info({ wallet: walletDocumentData }, 'Updating wallet NFTs')
  try {
    await updateNftsForWallet({ wallet: walletDocumentData, logger })
    logger.info({ wallet: walletDocumentData }, 'Done updating wallet NFTs')
  } catch (err) {
    logger.error({ err, wallet }, 'error updating wallet NFT')
  }
}
