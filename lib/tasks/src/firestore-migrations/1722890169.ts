import { getCollections } from '@echo/firestore/crud/collection/get-collections'
import { dumpDb } from '@echo/firestore/services/dump-db'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { updateNftsForCollection } from '@echo/tasks/update-nfts-for-collection'

/**
 * This migration is following the change of the NFT model
 * Before, when an NFT was not owned by a user in the db, it was not added or was deleted if it was present.
 * With the new model, NFTs are never deleted from the database, and when the owner is not a user in our db, it is set to undefined.
 * This migration simply updates all the NFT collections in the database to add all of their NFTs and set the owner accordingly.
 * For now, it does not update any EscrowedNFT, because at the time of writing there is none in our db.
 * We will have to update the migration if there are when we deploy to production.
 */
async function migrate() {
  const id = '1722890169'
  const logger = getLogger(`migration-${id}`)
  logger.info(`Starting migration ${id}...`)
  await dumpDb(`${id}-before.json`, logger)
  const collections = await getCollections()
  for (const collection of collections) {
    await updateNftsForCollection({ collection, fetch, logger })
  }
  await dumpDb(`${id}-after.json`, logger)
  logger.info(`Migration ${id} completed`)
}

await migrate().then(() => {
  process.exit(0)
})
