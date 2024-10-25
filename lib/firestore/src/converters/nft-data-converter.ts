import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'
import type { Nft } from '@echo/model/types/nft'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { assoc, has, invoker, pipe, unless } from 'ramda'

export const nftDataConverter = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NftDocumentData, NftDocumentData>): Nft {
    return pipe(
      invoker(0, 'data'),
      unless<NftDocumentData, NftDocumentData>(has('owner'), assoc('owner', undefined)),
      unless<NftDocumentData, NftDocumentData>(has('pictureUrl'), assoc('pictureUrl', undefined))
    )(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Nft>): WithFieldValue<NftDocumentData> {
    return modelObject
  }
}
