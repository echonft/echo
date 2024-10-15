import { NftError } from '@echo/firestore/constants/errors/nft-error'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Nft, type NftIndex } from '@echo/model/types/nft'
import { FieldValue } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function removeNftOwner(nft: NftIndex): Promise<Nft> {
  const snapshot = await getNftSnapshot(nft)
  if (isNil(snapshot)) {
    return Promise.reject(Error(NftError.NotFound))
  }
  return updateReference({
    collectionReference: getNftsCollectionReference(),
    id: snapshot.id,
    data: { owner: FieldValue.delete() }
  })
}
