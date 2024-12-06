import { getNftSnapshotByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { updateReference } from '@echo/firestore/helpers/reference/update-reference'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { type NftIndex } from '@echo/model/types/nft'
import { FieldValue } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function removeNftOwner(nft: NftIndex): Promise<NftDocument> {
  const snapshot = await getNftSnapshotByIndex(nft)
  if (isNil(snapshot)) {
    return Promise.reject(Error(NftError.NotFound))
  }
  return updateReference({
    collectionReference: nftsCollection(),
    id: snapshot.id,
    data: { owner: FieldValue.delete() }
  })
}
