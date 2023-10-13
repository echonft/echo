import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import type { OfferPost } from '@echo/firestore/types/model/offer-post/offer-post'
import type { OfferPostDocumentData } from '@echo/firestore/types/model/offer-post/offer-post-document-data'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'

export const offerPostDocumentDataConverter: FirestoreDocumentDataConverter<OfferPostDocumentData, OfferPost> = {
  fromFirestore: modifyNumberPropToDate('postedAt'),
  toFirestore: modifyDatePropToNumber('postedAt')
}
