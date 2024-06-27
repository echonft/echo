import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import type { Wallet } from '@echo/model/types/wallet'
import { getNftsByAccount } from '@echo/opensea/services/get-nfts-by-account'
import { getBaseLogger } from '@echo/utils/services/logger'
import { forEach } from 'ramda'

export async function fetchNftsForWalletCommand(wallet: Wallet) {
  const logger = getBaseLogger('FetchNftsForWalletCommand', { serializers: modelLoggerSerializers })
  logger.info({ wallet }, 'fetching NFTs')
  try {
    const nfts = await getNftsByAccount({ wallet, fetch, logger })
    logger.info(`received ${nfts.length} NFTs`)
    forEach((nft) => {
      logger.info({ nft })
    }, nfts)
  } catch (err) {
    logger.error({ err, wallet }, 'error fetching NFTs')
  }
}
