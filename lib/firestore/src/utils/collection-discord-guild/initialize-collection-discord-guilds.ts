import { initializeFirestoreCollection } from '@echo/firestore/utils/initialize-firestore-collection'
import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'

export async function initializeCollectionDiscordGuilds() {
  await initializeFirestoreCollection(CollectionReferenceName.COLLECTION_DISCORD_GUILDS)
}
