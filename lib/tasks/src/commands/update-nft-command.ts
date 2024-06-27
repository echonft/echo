import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import type { Wallet } from '@echo/model/types/wallet'
import { getNft } from '@echo/opensea/services/get-nft'
import { getBaseLogger } from '@echo/utils/services/logger'
import { isNil } from 'ramda'

export async function updateNftCommand(contract: Wallet, tokenId: string) {
  const logger = getBaseLogger('UpdateNftCommand', { serializers: modelLoggerSerializers })
  logger.info({ nft: { collection: { contract }, tokenId } }, 'fetching NFT')
  try {
    await initializeFirebase()
    const nft = await getNft({ contract, identifier: tokenId, fetch, logger })
    if (isNil(nft)) {
      logger.error('did not get any result')
      return
    }
    await updateNft(nft)
    logger.info({ nft }, 'updated NFT')
  } catch (err) {
    logger.error({ err, nft: { collection: { contract }, tokenId } }, `error updating NFT`)
  }
}
