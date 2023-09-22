import { nftDocumentDataConverter } from '@echo/firestore/converters/nft/nft-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreModel } from '@echo/firestore/types/abstract/firestore-model'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import type { FirestoreDataConverter, QueryDocumentSnapshot, SetOptions } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const nftDataConverter: FirestoreDataConverter<Partial<FirestoreNft>> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NftDocumentData>): FirestoreNft {
    return pipe(getSnapshotData<NftDocumentData>, nftDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: FirestoreModel<FirestoreNft>, _options?: SetOptions): NftDocumentData {
    return nftDocumentDataConverter.toFirestore(modelObject)
  }
}
