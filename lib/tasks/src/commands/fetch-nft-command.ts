import type { Wallet } from '@echo/model/types/wallet'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { fetchNft } from '@echo/tasks/fetch-nft'
import { andThen, isNil, otherwise, pipe } from 'ramda'

export async function fetchNftCommand(contract: Wallet, tokenId: string) {
  const logger = getLogger(fetchNftCommand.name)
  await pipe(
    fetchNft,
    andThen((nft) => {
      if (isNil(nft)) {
        logger.warn({ nft }, 'NFT not found')
      } else {
        logger.info({ nft }, 'fetched NFT')
      }
    }),
    otherwise((err) => {
      logger.error({ err, nft: { tokenId, collection: { contract } } }, 'could not fetch NFT')
    })
  )({ contract, fetch, identifier: tokenId, logger })
}
