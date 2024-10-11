import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import type { Nft } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getNftReferenceById(id: string): Promise<DocumentReference<Nft, NftDocumentData>> {
  return getReferenceById({ collectionReference: getNftsCollectionReference(), id })
}

export function getNftById(id: string): Promise<Nullable<Nft>> {
  return pipe(getNftReferenceById, andThen(getReferenceData))(id)
}
