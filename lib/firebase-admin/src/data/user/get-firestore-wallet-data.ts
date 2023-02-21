import { convertWallet } from '../../converters/user/convert-wallet'
import { getCollectionFromRef } from '../../utils/collection/get-collection-from-ref'
import { getDocInCollection } from '../../utils/collection/get-doc-in-collection'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { getDocSnapshotFromRef } from '../../utils/document/get-doc-snapshot-from-ref'
import { FirestoreUser, FirestoreWallet } from '@echo/firestore'
import { CollectionReference, DocumentReference } from '@google-cloud/firestore'
import { andThen, partialRight, pipe } from 'ramda'

export const getFirestoreWalletData = (userDocumentPath: string, walletDocumentPath: string) =>
  pipe(
    getDocRefFromPath,
    partialRight<DocumentReference<FirestoreUser>, string, CollectionReference<FirestoreWallet>>(getCollectionFromRef, [
      'wallets'
    ]),
    partialRight<CollectionReference<FirestoreWallet>, string, DocumentReference<FirestoreWallet>>(getDocInCollection, [
      walletDocumentPath
    ]),
    getDocSnapshotFromRef,
    andThen(convertWallet)
  )('users', userDocumentPath)
