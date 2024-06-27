import type { Wallet } from '@echo/model/types/wallet'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { fetchNfts } from '@echo/tasks/fetch-nfts'
import { forEach, isNil } from 'ramda'

export async function fetchNftsForWalletCommand(wallet: Wallet) {
  const logger = getLogger(fetchNftsForWalletCommand.name)
  const nfts = await fetchNfts({ wallet, fetch, logger })
  if (isNil(nfts)) {
    logger.error({ wallet }, 'could not fetch NFTs')
    return
  }
  forEach(
    forEach((nft) => {
      logger.info({ wallet, nft }, 'fetched NFT')
    }),
    nfts
  )
}
