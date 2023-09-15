import { offerItemDocumentDataConverter } from '@echo/firestore/converters/offer-item-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import { modifyDocumentDataArrayProp } from '@echo/firestore/helpers/converters/from-firestore/modify-document-data-array-prop'
import { modifyExpiresAtProp } from '@echo/firestore/helpers/converters/from-firestore/modify-expiresAt-prop'
import { modifyModelArrayProp } from '@echo/firestore/helpers/converters/to-firestore/modify-model-array-prop'
import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'
import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
import type { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/lib/firestore'
import { assoc, dissoc, has, lens, map, over, path, pipe, prop, uniq, when } from 'ramda'

export const offerDataConverter: FirestoreDataConverter<Partial<FirestoreOffer>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferDocumentData>) {
    return pipe(
      getSnapshotData<OfferDocumentData>,
      modifyNumberPropToDate('createdAt'),
      modifyExpiresAtProp,
      modifyDocumentDataArrayProp('receiverItems', offerItemDocumentDataConverter),
      dissoc('receiverItemsNftIds'),
      dissoc('receiverItemsNftCollectionIds'),
      modifyDocumentDataArrayProp('senderItems', offerItemDocumentDataConverter),
      dissoc('senderItemsNftIds'),
      dissoc('senderItemsNftCollectionIds')
    )(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<FirestoreOffer>, _options?: SetOptions): OfferDocumentData {
    return pipe(
      dissoc('expired'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modifyDatePropToNumber('createdAt'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modifyDatePropToNumber('expiresAt'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
      modifyModelArrayProp('senderItems', offerItemDocumentDataConverter)
    )(modelObject) as OfferDocumentData
  }
}
