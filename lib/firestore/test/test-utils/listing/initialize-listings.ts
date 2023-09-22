import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { listingDocumentDataMock } from '@echo/firestore-mocks/listing/listing-document-data-mock'

export async function initializeListings() {
  const listings = Object.values(listingDocumentDataMock)
  for (const listing of listings) {
    await firestoreApp().collection(CollectionName.LISTINGS).doc(listing.id).set(listing)
  }
}
