import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import type { FirestoreListingPost } from '@echo/firestore/types/model/listing-post/firestore-listing-post'
import type { ListingPostDocumentData } from '@echo/firestore/types/model/listing-post/listing-post-document-data'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'

export const listingPostDocumentDataConverter: FirestoreDocumentDataConverter<
  ListingPostDocumentData,
  FirestoreListingPost
> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: modifyNumberPropToDate('postedAt'),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: modifyDatePropToNumber('postedAt')
}
