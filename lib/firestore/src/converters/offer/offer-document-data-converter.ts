import { offerItemDocumentDataConverter } from '@echo/firestore/converters/offer/offer-item-document-data-converter'
import { modifyDocumentDataArrayProp } from '@echo/firestore/helpers/converters/from-firestore/modify-document-data-array-prop'
import { modifyExpiresAtProp } from '@echo/firestore/helpers/converters/from-firestore/modify-expiresAt-prop'
import { modifyModelArrayProp } from '@echo/firestore/helpers/converters/to-firestore/modify-model-array-prop'
import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
import { assoc, dissoc, has, lens, map, over, path, pipe, prop, uniq, when } from 'ramda'

export const offerDocumentDataConverter: FirestoreDocumentDataConverter<OfferDocumentData, FirestoreOffer> = {
  fromFirestore: pipe(
    modifyNumberPropToDate('createdAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modifyExpiresAtProp,
    modifyDocumentDataArrayProp('receiverItems', offerItemDocumentDataConverter),
    dissoc('receiverItemsNftIds'),
    dissoc('receiverItemsNftCollectionIds'),
    modifyDocumentDataArrayProp('senderItems', offerItemDocumentDataConverter),
    dissoc('senderItemsNftIds'),
    dissoc('senderItemsNftCollectionIds'),
    modifyNumberPropToDate('updatedAt')
  ),
  toFirestore: pipe(
    dissoc('expired'),
    modifyDatePropToNumber('createdAt'),
    modifyDatePropToNumber('expiresAt'),
    when(
      has('receiverItems'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      over(lens(prop('receiverItems'), assoc('receiverItemsNftIds')), pipe(map(path(['nft', 'id'])), uniq))
    ),
    when(
      has('receiverItems'),
      over(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        lens(prop('receiverItems'), assoc('receiverItemsNftCollectionIds')),
        pipe(map(path(['nft', 'collection', 'id'])), uniq)
      )
    ),
    modifyModelArrayProp('receiverItems', offerItemDocumentDataConverter),
    when(
      has('senderItems'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      over(lens(prop('senderItems'), assoc('senderItemsNftIds')), pipe(map(path(['nft', 'id'])), uniq))
    ),
    when(
      has('senderItems'),
      over(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        lens(prop('senderItems'), assoc('senderItemsNftCollectionIds')),
        pipe(map(path(['nft', 'collection', 'id'])), uniq)
      )
    ),
    modifyModelArrayProp('senderItems', offerItemDocumentDataConverter),
    modifyDatePropToNumber('updatedAt')
  )
}
