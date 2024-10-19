import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import { getReferenceData } from '@echo/firestore/helpers/crud/reference/get-reference-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function getWalletReferenceById(id: string): DocumentReference<WalletDocumentData, WalletDocumentData> {
  return getReferenceById({
    collectionReference: getWalletsCollectionReference(),
    id
  })
}

export function getWalletById(id: string): Promise<Nullable<WalletDocumentData>> {
  return pipe(getWalletReferenceById, getReferenceData)(id)
}
