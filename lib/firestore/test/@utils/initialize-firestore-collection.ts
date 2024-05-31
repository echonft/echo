import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { collectionDiscordGuildMock } from '@echo/firestore-mocks/collection-discord-guild/collection-discord-guild-mock'
import { collectionSwapsCountMock } from '@echo/firestore-mocks/collection-swaps-count/collection-swaps-count-mock'
import { listingDocumentDataMock } from '@echo/firestore-mocks/listing/listing-document-data-mock'
import { listingOfferMock } from '@echo/firestore-mocks/listing-offer/listing-offer-mock'
import { listingPostMock } from '@echo/firestore-mocks/listing-post/listing-post-mock'
import { offerDocumentDataMock } from '@echo/firestore-mocks/offer/offer-document-data-mock'
import { offerThreadMock } from '@echo/firestore-mocks/offer-thread/offer-thread-mock'
import { swapMock } from '@echo/firestore-mocks/swap/swap-mock'
import { swapPostMock } from '@echo/firestore-mocks/swap-post/swap-post-mock'
import { userDocumentDataMock } from '@echo/firestore-mocks/user/user-document-data-mock'
import { walletDocumentDataMock } from '@echo/firestore-mocks/wallet/wallet-document-data-mock'
import { collectionMock } from '@echo/model-mocks/collection/collection-mock'
import { nftMock } from '@echo/model-mocks/nft/nft-mock'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { DocumentData, WriteResult } from 'firebase-admin/firestore'
import { always, ifElse, isNil, mapObjIndexed, pipe, values } from 'ramda'

function getMock(collectionReferenceName: CollectionReferenceName) {
  switch (collectionReferenceName) {
    case CollectionReferenceName.COLLECTIONS:
      return collectionMock() as Record<string, DocumentData>
    case CollectionReferenceName.COLLECTION_DISCORD_GUILDS:
      return collectionDiscordGuildMock() as Record<string, DocumentData>
    case CollectionReferenceName.COLLECTION_SWAPS_COUNT:
      return collectionSwapsCountMock() as Record<string, DocumentData>
    case CollectionReferenceName.LISTINGS:
      return listingDocumentDataMock() as Record<string, DocumentData>
    case CollectionReferenceName.LISTING_OFFERS:
      return listingOfferMock() as Record<string, DocumentData>
    case CollectionReferenceName.LISTING_POSTS:
      return listingPostMock() as Record<string, DocumentData>
    case CollectionReferenceName.NFTS:
      return nftMock as Record<string, DocumentData>
    case CollectionReferenceName.OFFERS:
      return offerDocumentDataMock() as Record<string, DocumentData>
    case CollectionReferenceName.OFFER_THREADS:
      return offerThreadMock() as Record<string, DocumentData>
    case CollectionReferenceName.SWAPS:
      return swapMock() as Record<string, DocumentData>
    case CollectionReferenceName.SWAP_POSTS:
      return swapPostMock() as Record<string, DocumentData>
    case CollectionReferenceName.USERS:
      return userDocumentDataMock() as Record<string, DocumentData>
    case CollectionReferenceName.WALLETS:
      return walletDocumentDataMock() as Record<string, DocumentData>
    default:
      return undefined
  }
}

export async function initializeFirestoreCollection(collectionReferenceName: CollectionReferenceName) {
  await pipe(
    getMock,
    ifElse(
      isNil,
      always(Promise.resolve([])),
      pipe(
        mapObjIndexed<DocumentData, Promise<WriteResult>, string>((mock, id) =>
          firestoreApp().collection(collectionReferenceName).doc(id).set(mock)
        ),
        values,
        promiseAll
      )
    )
  )(collectionReferenceName)
}
