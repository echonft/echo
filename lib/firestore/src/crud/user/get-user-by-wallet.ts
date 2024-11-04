import { usersCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { Address } from '@echo/model/types/address'
import type { Nullable } from '@echo/utils/types/nullable'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getUserSnapshotByWallet(
  wallet: Address
): Promise<Nullable<QueryDocumentSnapshot<UserDocument & Required<Pick<UserDocument, 'wallet'>>>>> {
  return pipe(usersCollection, queryWhere('wallet', '==', wallet), getQueryUniqueDocumentSnapshot)() as Promise<
    Nullable<QueryDocumentSnapshot<UserDocument & Required<Pick<UserDocument, 'wallet'>>>>
  >
}

export function getUserByWallet(
  wallet: Address
): Promise<Nullable<UserDocument & Required<Pick<UserDocument, 'wallet'>>>> {
  return pipe(getUserSnapshotByWallet, andThen(getDocumentSnapshotData))(wallet)
}
