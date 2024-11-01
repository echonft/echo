import { CollectionPath } from '@echo/firestore/constants/collection-path'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { type CollectionDiscordGuildDocument } from '@echo/firestore/types/model/collection-discord-guild-document'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import type { EscrowedNftDocument } from '@echo/firestore/types/model/escrowed-nft-document'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import type { ListingPostDocument } from '@echo/firestore/types/model/listing-post-document'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { NonceDocument } from '@echo/firestore/types/model/nonce-document'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { OfferThreadDocument } from '@echo/firestore/types/model/offer-thread-document'
import type { OfferUpdatePostDocument } from '@echo/firestore/types/model/offer-update-post-document'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import type { SwapPostDocument } from '@echo/firestore/types/model/swap-post-document'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { CollectionReference } from 'firebase-admin/firestore'

export function collectionDiscordGuildsCollection() {
  return firestoreApp().collection(
    CollectionPath.CollectionDiscordGuilds
  ) as CollectionReference<CollectionDiscordGuildDocument>
}
export function collectionsCollection() {
  return firestoreApp().collection(CollectionPath.Collections) as CollectionReference<CollectionDocument>
}
export function escrowedNftsCollection() {
  return firestoreApp().collection(CollectionPath.EscrowedNfts) as CollectionReference<EscrowedNftDocument>
}
export function listingPostsCollection() {
  return firestoreApp().collection(CollectionPath.ListingPosts) as CollectionReference<ListingPostDocument>
}
export function listingsCollection() {
  return firestoreApp().collection(CollectionPath.Listings) as CollectionReference<ListingDocument>
}
export function nftsCollection() {
  return firestoreApp().collection(CollectionPath.Nfts) as CollectionReference<NftDocument>
}
export function noncesCollection() {
  return firestoreApp().collection(CollectionPath.Nonces) as CollectionReference<NonceDocument>
}
export function offerThreadsCollection() {
  return firestoreApp().collection(CollectionPath.OfferThreads) as CollectionReference<OfferThreadDocument>
}
export function offerUpdatePostsCollection() {
  return firestoreApp().collection(CollectionPath.OfferUpdatePosts) as CollectionReference<OfferUpdatePostDocument>
}
export function offersCollection() {
  return firestoreApp().collection(CollectionPath.Offers) as CollectionReference<OfferDocument>
}
export function swapPostsCollection() {
  return firestoreApp().collection(CollectionPath.SwapPosts) as CollectionReference<SwapPostDocument>
}
export function swapsCollection() {
  return firestoreApp().collection(CollectionPath.Swaps) as CollectionReference<SwapDocument>
}
export function usersCollection() {
  return firestoreApp().collection(CollectionPath.Users) as CollectionReference<UserDocument>
}
