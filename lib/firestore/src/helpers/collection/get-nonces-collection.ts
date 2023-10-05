import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nonceDataConverter } from '@echo/firestore/converters/nonce/nonce-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export function getNoncesCollection() {
  return firestoreApp().collection(CollectionName.NONCES).withConverter(nonceDataConverter)
}
