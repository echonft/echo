import { nftDocumentDataConverter } from '@echo/firestore/converters/nft/nft-document-data-converter'
import { getSnapshotData } from '@echo/firestore/helpers/converters/from-firestore/get-snapshot-data'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import type { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { PartialWithFieldValue } from 'firebase-admin/lib/firestore'
import { pipe } from 'ramda'

export const nftDataConverter: FirestoreDataConverter<FirestoreNft> = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NftDocumentData>): FirestoreNft {
    return pipe(getSnapshotData<NftDocumentData>, nftDocumentDataConverter.fromFirestore)(snapshot)
  },
  toFirestore(modelObject: PartialWithFieldValue<FirestoreNft>): NftDocumentData {
    return nftDocumentDataConverter.toFirestore(modelObject)
  }
}
