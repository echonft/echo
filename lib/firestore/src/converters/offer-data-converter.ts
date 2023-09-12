import { getSnapshotData } from '../helpers/converters/from-firestore/get-snapshot-data'
import { modifyDocumentDataArrayProp } from '../helpers/converters/from-firestore/modify-document-data-array-prop'
import { modifyDocumentDataProp } from '../helpers/converters/from-firestore/modify-document-data-prop'
import { modifyExpiresAtProp } from '../helpers/converters/from-firestore/modify-expiresAt-prop'
import { modifyModelArrayProp } from '../helpers/converters/to-firestore/modify-model-array-prop'
import { modifyModelProp } from '../helpers/converters/to-firestore/modify-model-prop'
import { FirestoreModel } from '../types/abstract/firestore-model'
import { OfferDocumentData } from '../types/model/offer-document-data'
import { offerItemDocumentDataConverter } from './offer-item-document-data-converter'
import { userDetailsDocumentDataConverter } from './user-details-document-data-converter'
import { Offer } from '@echo/firestore-types'
import modifyDatePropToNumber from '@echo/utils/modify-date-prop-to-number'
import modifyNumberPropToDate from '@echo/utils/modify-number-prop-to-date'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { assoc, dissoc, has, lens, map, over, path, pipe, prop, uniq, when } from 'ramda'

export const offerDataConverter: FirestoreDataConverter<Partial<Offer>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferDocumentData>) {
    return pipe(
      getSnapshotData<OfferDocumentData>,
      modifyNumberPropToDate('createdAt'),
      modifyExpiresAtProp,
      modifyDocumentDataProp('receiver', userDetailsDocumentDataConverter),
      dissoc('receiverId'),
      modifyDocumentDataArrayProp('receiverItems', offerItemDocumentDataConverter),
      dissoc('receiverItemsNftIds'),
      dissoc('receiverItemsNftCollectionIds'),
      modifyDocumentDataProp('sender', userDetailsDocumentDataConverter),
      dissoc('senderId'),
      modifyDocumentDataArrayProp('senderItems', offerItemDocumentDataConverter),
      dissoc('senderItemsNftIds'),
      dissoc('senderItemsNftCollectionIds')
    )(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<Offer>, _options?: SetOptions): OfferDocumentData {
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
      when(has('receiver'), over(lens(prop('receiver'), assoc('receiverId')), prop('id'))),
      modifyModelProp('receiver', userDetailsDocumentDataConverter),
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      when(has('sender'), over(lens(prop('sender'), assoc('senderId')), prop('id'))),
      modifyModelProp('sender', userDetailsDocumentDataConverter),
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
