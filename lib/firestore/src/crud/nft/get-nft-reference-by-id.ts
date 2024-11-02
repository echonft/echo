import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getReferenceById } from '@echo/firestore/helpers/reference/get-reference-by-id'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { DocumentReference } from 'firebase-admin/firestore'

export function getNftReferenceById(id: string): DocumentReference<NftDocument> {
  return getReferenceById({ collectionReference: nftsCollection(), id })
}
