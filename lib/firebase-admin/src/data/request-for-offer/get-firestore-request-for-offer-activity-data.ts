import { convertRequestForOfferActivity } from '../../converters/request-for-offer/convert-request-for-offer-activity'
import { getCollectionFromRef } from '../../utils/collection/get-collection-from-ref'
import { getDocInCollection } from '../../utils/collection/get-doc-in-collection'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { getDocSnapshotFromRef } from '../../utils/document/get-doc-snapshot-from-ref'
import { FirestoreRequestForOffer, FirestoreRequestForOfferActivity } from '@echo/firestore'
import { CollectionReference, DocumentReference } from '@google-cloud/firestore'
import { andThen, partialRight, pipe } from 'ramda'

export const getFirestoreRequestForOfferActivityData = (
  requestForOfferDocumentPath: string,
  activityDocumentPath: string
) =>
  pipe(
    getDocRefFromPath,
    partialRight<
      DocumentReference<FirestoreRequestForOffer>,
      string,
      CollectionReference<FirestoreRequestForOfferActivity>
    >(getCollectionFromRef, ['activities']),
    partialRight<
      CollectionReference<FirestoreRequestForOfferActivity>,
      string,
      DocumentReference<FirestoreRequestForOfferActivity>
    >(getDocInCollection, [activityDocumentPath]),
    getDocSnapshotFromRef,
    andThen(convertRequestForOfferActivity)
  )('requests-for-offer', requestForOfferDocumentPath)
