import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { getReferenceById } from '@echo/firestore/helpers/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/reference/get-reference-data'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getNftReferenceById(id: string): DocumentReference<NftDocument> {
  return getReferenceById({ collectionReference: nftsCollection(), id })
}

export function getNftById(id: string): Promise<Nullable<NftDocument>> {
  return pipe(getNftReferenceById, getReferenceData)(id)
}
