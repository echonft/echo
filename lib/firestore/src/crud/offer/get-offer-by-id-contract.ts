import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import type { Offer } from '@echo/model/types/offer'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getOfferSnapshotByIdContract(
  idContract: HexString
): Promise<Nullable<QueryDocumentSnapshot<Offer, OfferDocumentData>>> {
  return pipe(
    getOffersCollectionReference,
    queryWhere('idContract', '==', idContract),
    getQueryUniqueDocumentSnapshot
  )()
}
export function getOfferByIdContract(idContract: HexString): Promise<Nullable<Offer>> {
  return pipe(getOfferSnapshotByIdContract, andThen(getDocumentSnapshotData))(idContract)
}
