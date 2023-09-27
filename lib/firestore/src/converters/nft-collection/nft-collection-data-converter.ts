import { nftCollectionDocumentDataConverter } from '@echo/firestore/converters/nft-collection/nft-collection-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import type { NftCollectionDocumentData } from '@echo/firestore/types/model/nft-collection/nft-collection-document-data'
import type { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { PartialWithFieldValue } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const nftCollectionDataConverter: FirestoreDataConverter<FirestoreNftCollection> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NftCollectionDocumentData>) {
    return pipe(getSnapshotData<NftCollectionDocumentData>, nftCollectionDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<FirestoreNftCollection>): NftCollectionDocumentData {
    return nftCollectionDocumentDataConverter.toFirestore(modelObject)
  }
}
