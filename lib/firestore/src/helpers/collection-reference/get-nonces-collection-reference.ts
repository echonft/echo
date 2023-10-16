import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { nonceDataConverter } from '@echo/firestore/converters/nonce/nonce-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export function getNoncesCollectionReference() {
  return firestoreApp().collection(CollectionReferenceName.NONCES).withConverter(nonceDataConverter)
}
