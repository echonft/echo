import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingPostDocumentDataConverter } from '@echo/firestore/converters/listing-post/listing-post-document-data-converter'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { ListingPostDocumentData } from '@echo/firestore/types/model/listing-post/listing-post-document-data'
import dayjs from 'dayjs'
import { isNil } from 'ramda'

export async function addListingPost(listingId: string, guildDiscordId: string, guildChannelId: string) {
  const listing = await findListingById(listingId)
  if (isNil(listing)) {
    throw Error(`trying to add post for listing with id ${listingId} but this listing does not exist`)
  }
  const reference = firestoreApp().collection(CollectionName.LISTING_POSTS).doc()
  const id = reference.id
  const newListingPost: ListingPostDocumentData = {
    id,
    listingId: listingId,
    guild: { discordId: guildDiscordId, channelId: guildChannelId },
    postedAt: dayjs().unix()
  }
  await reference.set(newListingPost)
  return listingPostDocumentDataConverter.fromFirestore(newListingPost)
}
