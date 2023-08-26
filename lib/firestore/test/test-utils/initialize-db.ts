import { CollectionName } from '../../src/constants/collection-name'
import { firestore } from '../../src/services/firestore'
import { listingDocumentDataMock } from '../mocks/listing-document-data-mock'
import { nftCollectionDocumentDataMock } from '../mocks/nft-collection-document-data-mock'
import { nftDocumentDataMock } from '../mocks/nft-document-data-mock'
import { offerDocumentDataMock } from '../mocks/offer-document-data-mock'
import { userDocumentDataMock } from '../mocks/user-document-data-mock'

export async function initializeDb() {
  const listings = Object.values(listingDocumentDataMock)
  for (const listing of listings) {
    await firestore().collection(CollectionName.LISTINGS).doc(listing.id).set(listing)
  }
  const nftCollections = Object.values(nftCollectionDocumentDataMock)
  for (const collection of nftCollections) {
    await firestore().collection(CollectionName.NFT_COLLECTIONS).doc(collection.id).set(collection)
  }
  const nfts = Object.values(nftDocumentDataMock)
  for (const nft of nfts) {
    await firestore().collection(CollectionName.NFTS).doc(nft.id).set(nft)
  }
  const offers = Object.values(offerDocumentDataMock)
  for (const offer of offers) {
    await firestore().collection(CollectionName.OFFERS).doc(offer.id).set(offer)
  }
  const users = Object.values(userDocumentDataMock)
  for (const user of users) {
    await firestore().collection(CollectionName.USERS).doc(user.id).set(user)
  }
}
