import type { Wallet } from '@echo/model/types/wallet'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { fetchNft } from '@echo/tasks/fetch-nft'

export async function fetchNftCommand(contract: Wallet, tokenId: string) {
  const logger = getLogger(fetchNftCommand.name)
  try {
    const nft = await fetchNft({ contract, fetch, identifier: tokenId, logger })
    logger.info({ nft }, 'fetched NFT')
  } catch (err) {
    logger.error({ err, nft: { tokenId, collection: { contract } } }, 'could not fetch NFT')
  }
}
