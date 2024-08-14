import { NftError } from '@echo/firestore/constants/errors/nft/nft-error'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import { type Nft, type NftIndex } from '@echo/model/types/nft'
import { FieldValue } from 'firebase-admin/firestore'
import { andThen, isNil, pipe } from 'ramda'

export async function removeNftOwner(nft: NftIndex): Promise<Nft> {
  const snapshot = await getNftSnapshot(nft)
  if (isNil(snapshot)) {
    return Promise.reject(Error(NftError.NOT_FOUND))
  }
  return pipe(
    updateReference<NftDocumentData>,
    andThen(nftDataConverter.fromDocumentData)
  )({
    collectionReference: getNftsCollectionReference(false),
    id: snapshot.id,
    data: { owner: FieldValue.delete() }
  })
}
