import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { collectionDocumentDataMock } from '@echo/firestore/mocks/db-model/collection-document-data-mock'
import { listingDocumentDataMock } from '@echo/firestore/mocks/db-model/listing-document-data-mock'
import { nftDocumentDataMock } from '@echo/firestore/mocks/db-model/nft-document-data-mock'
import { offerDocumentDataMock } from '@echo/firestore/mocks/db-model/offer-document-data-mock'
import { userDocumentDataMock } from '@echo/firestore/mocks/db-model/user/user-document-data-mock'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentData, WriteResult } from 'firebase-admin/firestore'
import { always, ifElse, isNil, mapObjIndexed, pipe, values } from 'ramda'

function getMock(collectionReferenceName: CollectionReferenceName) {
  switch (collectionReferenceName) {
    case CollectionReferenceName.Collections:
      return collectionDocumentDataMock() as Record<string, DocumentData>
    case CollectionReferenceName.Listings:
      return listingDocumentDataMock() as Record<string, DocumentData>
    case CollectionReferenceName.Nfts:
      return nftDocumentDataMock() as Record<string, DocumentData>
    case CollectionReferenceName.Offers:
      return offerDocumentDataMock() as Record<string, DocumentData>
    case CollectionReferenceName.Users:
      return userDocumentDataMock() as Record<string, DocumentData>
    default:
      return undefined
  }
}

export async function initializeFirestoreCollection(collectionReferenceName: CollectionReferenceName) {
  await pipe(
    getMock,
    ifElse<Nullable<Record<string, DocumentData>>, undefined | null, Promise<WriteResult[]>, Promise<WriteResult[]>>(
      isNil,
      always<Promise<WriteResult[]>>(Promise.resolve([])),
      pipe(
        mapObjIndexed<DocumentData, Promise<WriteResult>, string>((mock, id) =>
          firestoreApp().collection(collectionReferenceName).doc(id).set(mock)
        ),
        values,
        promiseAll<WriteResult>
      )
    )
  )(collectionReferenceName)
}
