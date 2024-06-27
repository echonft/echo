import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import type { Wallet } from '@echo/model/types/wallet'
import { getNft } from '@echo/nft-scan/services/get-nft'
import { getBaseLogger } from '@echo/utils/services/logger'

export async function fetchNftCommand(contract: Wallet, tokenId: string) {
  const logger = getBaseLogger('FetchNftCommand', { serializers: modelLoggerSerializers })
  try {
    const nft = await getNft({ contract, fetch, identifier: tokenId, logger })
    logger.info({ nft }, 'successfuly received NFT')
  } catch (err) {
    logger.error({ err, nft: { tokenId, collection: { contract } } }, 'error fetching NFT')
  }
}
