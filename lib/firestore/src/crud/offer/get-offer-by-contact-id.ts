import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Offer } from '@echo/model/types/offer'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getOfferSnapshotByContactId(idContract: HexString): Promise<Nullable<QueryDocumentSnapshot<Offer>>> {
  return pipe(
    getOffersCollectionReference,
    queryWhere<Offer>('idContract', '==', idContract),
    getQueryUniqueDocumentSnapshot
  )()
}
export function getOfferByContactId(idContract: HexString): Promise<Nullable<Offer>> {
  return pipe(getOfferSnapshotByContactId, andThen(getDocumentSnapshotData))(idContract)
}
