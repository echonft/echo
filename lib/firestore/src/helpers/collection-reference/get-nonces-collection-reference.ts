import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { nonceDataConverter } from '@echo/firestore/converters/nonce-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { NonceDocumentData } from '@echo/firestore/types/model/nonce-document-data'
import type { Nonce } from '@echo/model/types/nonce'
import type { CollectionReference } from 'firebase-admin/firestore'

export function getNoncesCollectionReference(): CollectionReference<Nonce, NonceDocumentData> {
  return firestoreApp()
    .collection(CollectionReferenceName.Nonces)
    .withConverter<Nonce, NonceDocumentData>(nonceDataConverter)
}
