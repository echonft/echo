import { getListingPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-posts-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'

export async function findListingPost(listingId: string, guildId: string) {
  const querySnapshot = await getListingPostsCollectionReference()
    .where('listingId', '==', listingId)
    .where('guild.discordId', '==', guildId)
    .get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
