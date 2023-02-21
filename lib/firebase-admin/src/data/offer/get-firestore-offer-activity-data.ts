import { convertOfferActivity } from '../../converters/offer/convert-offer-activity'
import { getCollectionFromRef } from '../../utils/collection/get-collection-from-ref'
import { getDocInCollection } from '../../utils/collection/get-doc-in-collection'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { getDocSnapshotFromRef } from '../../utils/document/get-doc-snapshot-from-ref'
import { FirestoreOffer, FirestoreOfferActivity } from '@echo/firestore'
import { CollectionReference, DocumentReference } from '@google-cloud/firestore'
import { andThen, partialRight, pipe } from 'ramda'

export const getFirestoreOfferActivityData = (offerDocumentPath: string, activityDocumentPath: string) =>
  pipe(
    getDocRefFromPath,
    partialRight<DocumentReference<FirestoreOffer>, string, CollectionReference<FirestoreOfferActivity>>(
      getCollectionFromRef,
      ['activities']
    ),
    partialRight<CollectionReference<FirestoreOfferActivity>, string, DocumentReference<FirestoreOfferActivity>>(
      getDocInCollection,
      [activityDocumentPath]
    ),
    getDocSnapshotFromRef,
    andThen(convertOfferActivity)
  )('offers', offerDocumentPath)
