import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { Nft } from '@echo/model/types/nft'
import type { CollectionReference } from 'firebase-admin/lib/firestore'

export function getNftsCollection() {
  return firestoreApp().collection(CollectionName.NFTS) as CollectionReference<Nft>
}
