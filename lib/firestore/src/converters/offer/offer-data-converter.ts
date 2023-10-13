import { assocExpiredProp } from '@echo/firestore/helpers/converters/from-firestore/assoc-expired-prop'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import type { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { PartialWithFieldValue } from 'firebase-admin/lib/firestore'
import { assoc, dissoc, has, lens, map, over, path, pipe, prop, uniq, when } from 'ramda'

export const offerDataConverter: FirestoreDataConverter<FirestoreOffer> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<OfferDocumentData>) {
    return pipe(
      getSnapshotData<OfferDocumentData>,
      assocExpiredProp,
      dissoc('receiverItemsNftIds'),
      dissoc('receiverItemsNftCollectionIds'),
      dissoc('senderItemsNftIds'),
      dissoc('senderItemsNftCollectionIds')
    )(snapshot)
  },

  toFirestore(modelObject: PartialWithFieldValue<FirestoreOffer>) {
    return pipe(
      dissoc('expired'),
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
      )
    )(modelObject) as Partial<OfferDocumentData>
  }
}
