import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import type { Wallet } from '@echo/model/types/wallet'
import { fetchNftsForWallet } from '@echo/tasks/fetch-nfts-for-wallet'
import { getBaseLogger } from '@echo/utils/services/logger'
import { always, forEach, isNil, otherwise, pipe } from 'ramda'

export async function fetchNftsForWalletCommand(wallet: Wallet) {
  const logger = getBaseLogger('FetchNftsForWalletCommand', { serializers: modelLoggerSerializers })
  logger.info({ wallet }, 'fetching NFTs for wallet')
  const nfts = await pipe(fetchNftsForWallet, otherwise(always(undefined)))({ wallet, fetch, logger })
  if (isNil(nfts)) {
    logger.error({ wallet }, 'could not fetch NFTs for wallet')
    return
  }
  forEach(
    forEach((nft) => {
      logger.info({ wallet, nft }, 'wallet owns NFT')
    }),
    nfts
  )
}
