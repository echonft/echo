import { getAllNfts } from '@echo/firestore/crud/nft/get-all-nfts'
import { updateNft } from '@echo/firestore/utils/nft/update-nft'
import { getLogger } from '@echo/tasks/commands/get-logger'

/**
 * This migration adds the type to NFTs.
 * Since only ERC721 NFTs are supported at the moment, we add this type to every NFTs.
 */
async function migrate() {
  const id = '1723571108'
  const logger = getLogger(`migration-${id}`)
  logger.info(`Starting migration ${id}...`)
  const nfts = await getAllNfts()
  for (const nft of nfts) {
    await updateNft(nft, { type: 'erc721' })
  }
  logger.info(`Migration ${id} completed`)
}

await migrate().then(() => {
  process.exit(0)
})
