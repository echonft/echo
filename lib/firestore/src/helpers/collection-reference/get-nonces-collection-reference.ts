import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { nonceDataConverter } from '@echo/firestore/converters/nonce/nonce-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { Nonce } from '@echo/firestore/types/model/nonce/nonce'
import type { NonceDocumentData } from '@echo/firestore/types/model/nonce/nonce-document-data'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getNoncesCollectionReference(): CollectionReference<Nonce, NonceDocumentData> {
  return firestoreApp()
    .collection(CollectionReferenceName.Nonces)
    .withConverter<Nonce, NonceDocumentData>(nonceDataConverter)
}
