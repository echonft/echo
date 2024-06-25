import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { getOfferThreadsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-collection-reference'
import { getOfferUpdatePostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-update-posts-collection-reference'
import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { getSwapPostsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swap-posts-collection-reference'
import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function deleteCollections() {
  await firestoreApp().recursiveDelete(getOfferThreadsCollectionReference())
  await firestoreApp().recursiveDelete(getOfferUpdatesCollectionReference())
  await firestoreApp().recursiveDelete(getOfferUpdatePostsCollectionReference())
  await firestoreApp().recursiveDelete(getOffersCollectionReference())
  await firestoreApp().recursiveDelete(getSwapPostsCollectionReference())
  await firestoreApp().recursiveDelete(getSwapsCollectionReference())
  await firestoreApp().recursiveDelete(getNftsCollectionReference())
  await firestoreApp().recursiveDelete(getCollectionSwapsCountCollectionReference())
  await firestoreApp().recursiveDelete(getCollectionsCollectionReference())
}
