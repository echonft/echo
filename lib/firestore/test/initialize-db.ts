import { CollectionPath } from '@echo/firestore/constants/collection-path'
import { collectionDocumentMockPx, collectionDocumentMockSpiral } from '@echo/firestore/mocks/collection-document-mock'
import { listingDocumentMock } from '@echo/firestore/mocks/listing-document-mock'
import {
  nftDocumentMockPx1,
  nftDocumentMockPx2,
  nftDocumentMockPx3,
  nftDocumentMockSpiral1,
  nftDocumentMockSpiral2,
  nftDocumentMockSpiral3
} from '@echo/firestore/mocks/nft-document-mock'
import {
  offerDocumentMockFromJohnnycage,
  offerDocumentMockToJohnnycage
} from '@echo/firestore/mocks/offer-document-mock'
import { userDocumentMockCrew, userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { promiseAll } from '@echo/utils/helpers/promise-all'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentData, WriteResult } from 'firebase-admin/firestore'
import { always, ifElse, isNil, mapObjIndexed, pipe, values } from 'ramda'

export const collectionDocumentMockPxId = 'Rc8pLQXxgyQGIRL0fr13'
export const collectionDocumentMocks = [collectionDocumentMockPx, collectionDocumentMockSpiral]
export const listingDocumentMockId = 'jUzMtPGKM62mMhEcmbN4'
export const listingDocumentMocks = [listingDocumentMock]
export const nftDocumentMockSpiral1Id = 'BhHFadIrrooORfTOLkBg'
export const nftDocumentMocks = [
  nftDocumentMockSpiral1,
  nftDocumentMockSpiral2,
  nftDocumentMockSpiral3,
  nftDocumentMockPx1,
  nftDocumentMockPx2,
  nftDocumentMockPx3
]
export const offerDocumentMockToJohnnycageId = 'LyCfl6Eg7JKuD7XJ6IPi'
export const offerDocumentMocks = [offerDocumentMockToJohnnycage, offerDocumentMockFromJohnnycage]
export const userDocumentMockJohnnyId = 'oE6yUEQBPn7PZ89yMjKn'
export const userDocumentMockCrewId = 'BrECUMhevHfxABZ1VNOm'
export const userDocumentMocks = [userDocumentMockCrew, userDocumentMockJohnny]

function getMock(collectionReferenceName: CollectionPath): Nullable<Record<string, DocumentData>> {
  switch (collectionReferenceName) {
    case CollectionPath.Collections:
      return {
        Rc8pLQXxgyQGIRL0fr13: collectionDocumentMockPx,
        AaomCtnoesD7WVll6Yi1: collectionDocumentMockSpiral
      }
    case CollectionPath.Listings:
      return {
        jUzMtPGKM62mMhEcmbN4: listingDocumentMock
      }
    case CollectionPath.Nfts:
      return {
        BhHFadIrrooORfTOLkBg: nftDocumentMockSpiral1,
        iRZFKEujarikVjpiFAkE: nftDocumentMockSpiral2,
        SSeF1NSN5uPUxtWSr516: nftDocumentMockSpiral3,
        QFjMRNChUAHNswkRADXh: nftDocumentMockPx1,
        XiDa6k2P7gxXCKSxn2wq: nftDocumentMockPx2,
        kRE3UCfXWkJ33nwzj2X1: nftDocumentMockPx3
      }
    case CollectionPath.Offers:
      return {
        LyCfl6Eg7JKuD7XJ6IPi: offerDocumentMockToJohnnycage,
        ASkFpKoHEHVH0gd69t1G: offerDocumentMockFromJohnnycage
      }
    case CollectionPath.Users:
      return {
        BrECUMhevHfxABZ1VNOm: userDocumentMockCrew,
        oE6yUEQBPn7PZ89yMjKn: userDocumentMockJohnny
      }
    default:
      return undefined
  }
}

async function initializeFirestoreCollection(collectionReferenceName: CollectionPath) {
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

export async function initializeDb() {
  const collectionsToInitialize = [
    CollectionPath.Collections,
    CollectionPath.Listings,
    CollectionPath.Nfts,
    CollectionPath.Offers,
    CollectionPath.Users
  ]
  for (const collection of collectionsToInitialize) {
    await initializeFirestoreCollection(collection)
  }
}
