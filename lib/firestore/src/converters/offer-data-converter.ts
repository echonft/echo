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
import {
  assocUndefinedIfPropNotPresent,
  modifyDatePropToNumber,
  modifyNumberPropToDate,
  removeUndefinedProps
} from '@echo/utils'
import { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/firestore'
import { assoc, dissoc, has, lens, map, over, path, pipe, prop, when } from 'ramda'

export const offerDataConverter: FirestoreDataConverter<Offer> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferDocumentData>): Offer {
    return pipe(
      getSnapshotData<OfferDocumentData>,
      modifyNumberPropToDate('createdAt'),
      assocUndefinedIfPropNotPresent('discordGuild'),
      modifyExpiresAtProp,
      modifyDocumentDataProp('receiver', userDetailsDocumentDataConverter),
      dissoc('receiverId'),
      modifyDocumentDataArrayProp('receiverItems', offerItemDocumentDataConverter),
      dissoc('receiverItemsNftIds'),
      modifyDocumentDataProp('sender', userDetailsDocumentDataConverter),
      dissoc('senderId'),
      modifyDocumentDataArrayProp('senderItems', offerItemDocumentDataConverter),
      dissoc('senderItemsNftIds'),
      assocUndefinedIfPropNotPresent('swapTransactionId')
    )(snapshot) as Offer
  },
  toFirestore(modelObject: FirestoreModel<Offer>, _options?: SetOptions): OfferDocumentData {
    return pipe(
      removeUndefinedProps,
      dissoc('expired'),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modifyDatePropToNumber('createdAt'),
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
        over(lens(prop('receiverItems'), assoc('receiverItemsNftIds')), map(path(['nft', 'id'])))
      ),
      modifyModelArrayProp('receiverItems', offerItemDocumentDataConverter),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      when(has('sender'), over(lens(prop('sender'), assoc('senderId')), prop('id'))),
      modifyModelProp('sender', userDetailsDocumentDataConverter),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      when(has('senderItems'), over(lens(prop('senderItems'), assoc('senderItemsNftIds')), map(path(['nft', 'id'])))),
      modifyModelArrayProp('senderItems', offerItemDocumentDataConverter)
    )(modelObject) as OfferDocumentData
  }
}
