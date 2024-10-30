import { walletsCollection } from '@echo/firestore/helpers/collection/collections'
import { getReferenceById } from '@echo/firestore/helpers/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/reference/get-reference-data'
import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getWalletReferenceById(id: string): DocumentReference<WalletDocument> {
  return getReferenceById({
    collectionReference: walletsCollection(),
    id
  })
}

export function getWalletById(id: string): Promise<Nullable<WalletDocument>> {
  return pipe(getWalletReferenceById, getReferenceData)(id)
}
