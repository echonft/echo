import { convertSwapActivity } from '../../converters/swap/convert-swap-activity'
import { getCollectionFromRef } from '../../utils/collection/get-collection-from-ref'
import { getDocInCollection } from '../../utils/collection/get-doc-in-collection'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { getDocSnapshotFromRef } from '../../utils/document/get-doc-snapshot-from-ref'
import { FirestoreSwap, FirestoreSwapActivity } from '@echo/firestore'
import { CollectionReference, DocumentReference } from '@google-cloud/firestore'
import { andThen, partialRight, pipe } from 'ramda'

export const getFirestoreSwapActivityData = (swapDocumentPath: string, activityDocumentPath: string) =>
  pipe(
    getDocRefFromPath,
    partialRight<DocumentReference<FirestoreSwap>, string, CollectionReference<FirestoreSwapActivity>>(
      getCollectionFromRef,
      ['activities']
    ),
    partialRight<CollectionReference<FirestoreSwapActivity>, string, DocumentReference<FirestoreSwapActivity>>(
      getDocInCollection,
      [activityDocumentPath]
    ),
    getDocSnapshotFromRef,
    andThen(convertSwapActivity)
  )('swaps', swapDocumentPath)
