import { nftCollectionDocumentDataConverter } from '@echo/firestore/converters/nft-collection-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import type { NftCollectionDocumentData } from '@echo/firestore/types/model/nft-collection/nft-collection-document-data'
import type { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const nftCollectionDataConverter: FirestoreDataConverter<Partial<FirestoreNftCollection>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NftCollectionDocumentData>) {
    return pipe(getSnapshotData<NftCollectionDocumentData>, nftCollectionDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<FirestoreNftCollection>, _options?: SetOptions): NftCollectionDocumentData {
    return nftCollectionDocumentDataConverter.toFirestore(modelObject)
  }
}
