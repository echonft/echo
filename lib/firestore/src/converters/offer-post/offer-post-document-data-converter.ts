import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import type { FirestoreOfferPost } from '@echo/firestore/types/model/offer-post/firestore-offer-post'
import type { OfferPostDocumentData } from '@echo/firestore/types/model/offer-post/offer-post-document-data'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'

export const offerPostDocumentDataConverter: FirestoreDocumentDataConverter<OfferPostDocumentData, FirestoreOfferPost> =
  {
    fromFirestore: modifyNumberPropToDate('postedAt'),
    toFirestore: modifyDatePropToNumber('postedAt')
  }
