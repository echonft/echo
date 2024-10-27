import { listingPostsCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { ListingPostDocument } from '@echo/firestore/types/model/listing-post-document'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

interface GetListingPostArgs {
  readonly listingId: string
  readonly guildId: string
}

function getListingPostSnapshot({
  listingId,
  guildId
}: GetListingPostArgs): Promise<Nullable<QueryDocumentSnapshot<ListingPostDocument>>> {
  return pipe(
    listingPostsCollection,
    queryWhere('listingId', '==', listingId),
    queryWhere('guild.id', '==', guildId),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getListingPost(args: GetListingPostArgs): Promise<Nullable<ListingPostDocument>> {
  return pipe(getListingPostSnapshot, andThen(getDocumentSnapshotData))(args)
}
