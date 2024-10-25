import { offersCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getOfferSnapshotByIdContract(
  idContract: HexString
): Promise<Nullable<QueryDocumentSnapshot<OfferDocument>>> {
  return pipe(offersCollection, queryWhere('idContract', '==', idContract), getQueryUniqueDocumentSnapshot)()
}
export function getOfferByIdContract(idContract: HexString): Promise<Nullable<OfferDocument>> {
  return pipe(getOfferSnapshotByIdContract, andThen(getDocumentSnapshotData))(idContract)
}
