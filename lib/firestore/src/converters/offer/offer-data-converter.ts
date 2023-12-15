import { assocExpiredProp } from '@echo/firestore/helpers/converters/from-firestore/assoc-expired-prop'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import { type OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { type Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import {
  type FirestoreDataConverter,
  type PartialWithFieldValue,
  QueryDocumentSnapshot
} from 'firebase-admin/firestore'
import {
  assoc,
  dissoc,
  has,
  lens,
  map,
  modify,
  modifyPath,
  over,
  partial,
  path,
  pipe,
  prop,
  toLower,
  uniq,
  when
} from 'ramda'

function modifyItems(items: OfferItem[]): OfferItem[] {
  return map<OfferItem, OfferItem>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pipe(
      partial(modifyPath, [['nft', 'owner', 'wallet', 'address'], toLower]),
      partial(modifyPath, [['nft', 'collection', 'contract', 'address'], toLower])
    )
  )(items)
}
function modifyReceiverItems(offer: Offer): Offer {
  return modify<'receiverItems', OfferItem[], OfferItem[]>('receiverItems', modifyItems)(offer) as Offer
}
function modifySenderItems(offer: Offer): Offer {
  return modify<'senderItems', OfferItem[], OfferItem[]>('senderItems', modifyItems)(offer) as Offer
}
function modifyReceiver(offer: Offer): Offer {
  return partial(modifyPath, [['receiver', 'wallet', 'address'], toLower])(offer) as Offer
}
function modifySender(offer: Offer): Offer {
  return partial(modifyPath, [['sender', 'wallet', 'address'], toLower])(offer) as Offer
}

export const offerDataConverter: FirestoreDataConverter<Offer> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferDocumentData>) {
    return pipe(
      getSnapshotData<OfferDocumentData>,
      assocExpiredProp,
      dissoc('receiverItemsNftIds'),
      dissoc('receiverItemsNftCollectionIds'),
      dissoc('senderItemsNftIds'),
      dissoc('senderItemsNftCollectionIds'),
      modifyReceiverItems,
      modifySenderItems,
      modifyReceiver,
      modifySender
    )(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<Offer>) {
    return pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dissoc('expired'),
      when(
        has('receiverItems'),
        pipe(
          modifyReceiverItems,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          over(lens(prop('receiverItems'), assoc('receiverItemsNftIds')), pipe(map(path(['nft', 'id'])), uniq)),
          over(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            lens(prop('receiverItems'), assoc('receiverItemsNftCollectionIds')),
            pipe(map(path(['nft', 'collection', 'id'])), uniq)
          )
        )
      ),
      when(has('receiver'), modifyReceiver),
      when(
        has('senderItems'),
        pipe(
          modifySenderItems,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          over(lens(prop('senderItems'), assoc('senderItemsNftIds')), pipe(map(path(['nft', 'id'])), uniq)),
          over(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            lens(prop('senderItems'), assoc('senderItemsNftCollectionIds')),
            pipe(map(path(['nft', 'collection', 'id'])), uniq)
          )
        )
      ),
      when(has('sender'), modifySender)
    )(modelObject) as Partial<OfferDocumentData>
  }
}
