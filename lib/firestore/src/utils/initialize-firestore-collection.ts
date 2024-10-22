import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { collectionDiscordGuildMock } from '@echo/firestore/mocks/collection-discord-guild/collection-discord-guild-mock'
import { collectionSwapsCountMock } from '@echo/firestore/mocks/collection-swaps-count/collection-swaps-count-mock'
import { listingPostMock } from '@echo/firestore/mocks/listing-post/listing-post-mock'
import { listingDocumentDataMock } from '@echo/firestore/mocks/listing/listing-document-data-mock'
import { nftDocumentDataMock } from '@echo/firestore/mocks/nft/nft-document-data-mock'
import { offerThreadMock } from '@echo/firestore/mocks/offer-thread/offer-thread-mock'
import { offerDocumentDataMock } from '@echo/firestore/mocks/offer/offer-document-data-mock'
import { swapPostMock } from '@echo/firestore/mocks/swap-post/swap-post-mock'
import { swapMock } from '@echo/firestore/mocks/swap/swap-mock'
import { userDocumentDataMock } from '@echo/firestore/mocks/user/user-document-data-mock'
import { walletDocumentDataMock } from '@echo/firestore/mocks/wallet/wallet-document-data-mock'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { collectionMock } from '@echo/model/mocks/collection/collection-mock'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentData, WriteResult } from 'firebase-admin/firestore'
import { always, ifElse, isNil, mapObjIndexed, pipe, values } from 'ramda'

function getMock(collectionReferenceName: CollectionReferenceName) {
  switch (collectionReferenceName) {
    case CollectionReferenceName.Collections:
      return collectionMock() as Record<string, DocumentData>
    case CollectionReferenceName.CollectionDiscordGuilds:
      return collectionDiscordGuildMock() as Record<string, DocumentData>
    case CollectionReferenceName.CollectionSwapsCount:
      return collectionSwapsCountMock() as Record<string, DocumentData>
    case CollectionReferenceName.Listings:
      return listingDocumentDataMock() as Record<string, DocumentData>
    case CollectionReferenceName.ListingPosts:
      return listingPostMock() as Record<string, DocumentData>
    case CollectionReferenceName.Nfts:
      return nftDocumentDataMock() as Record<string, DocumentData>
    case CollectionReferenceName.Offers:
      return offerDocumentDataMock() as Record<string, DocumentData>
    case CollectionReferenceName.OfferThreads:
      return offerThreadMock() as Record<string, DocumentData>
    case CollectionReferenceName.Swaps:
      return swapMock() as Record<string, DocumentData>
    case CollectionReferenceName.SwapPosts:
      return swapPostMock() as Record<string, DocumentData>
    case CollectionReferenceName.Users:
      return userDocumentDataMock() as Record<string, DocumentData>
    case CollectionReferenceName.Wallets:
      return walletDocumentDataMock() as Record<string, DocumentData>
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
