import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { getAllNfts } from '@echo/firestore/crud/nft/get-all-nfts'
import { updateCollection } from '@echo/firestore/utils/collection/update-collection'
import { updateNft } from '@echo/firestore/utils/nft/update-nft'
import { TokenType } from '@echo/model/constants/token-type'
import { getLogger } from '@echo/tasks/commands/get-logger'

/**
 * This migration adds the type to NFTs and collections.
 * Since only ERC721 NFTs are supported at the moment, we add this type to every NFTs and collections.
 */
async function migrate() {
  const id = '1723571108'
  const logger = getLogger(`migration-${id}`)
  logger.info(`Starting migration ${id}...`)
  const nfts = await getAllNfts()
  for (const nft of nfts) {
    await updateNft(nft, { type: TokenType.Erc721 })
  }
  const collections = await getAllCollections()
  for (const collection of collections) {
    await updateCollection(collection.slug, { type: TokenType.Erc721 })
  }
  logger.info(`Migration ${id} completed`)
}

await migrate().then(() => {
  process.exit(0)
})
