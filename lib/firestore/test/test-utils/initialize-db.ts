import { CollectionName } from '@echo/firestore/constants/collection-name'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { discordUserDocumentDataMock } from '@echo/firestore-mocks/discord-user-document-data-mock'
import { listingDocumentDataMock } from '@echo/firestore-mocks/listing-document-data-mock'
import { nftCollectionDocumentDataMock } from '@echo/firestore-mocks/nft-collection-document-data-mock'
import { nftDocumentDataMock } from '@echo/firestore-mocks/nft-document-data-mock'
import { offerDocumentDataMock } from '@echo/firestore-mocks/offer-document-data-mock'
import { sessionDocumentDataMock } from '@echo/firestore-mocks/session-document-data-mock'
import { userDocumentDataMock } from '@echo/firestore-mocks/user-document-data-mock'
import { walletDocumentDataMock } from '@echo/firestore-mocks/wallet-document-data-mock'

export async function initializeDb() {
  const discordUsers = Object.values(discordUserDocumentDataMock)
  for (const discordUser of discordUsers) {
    await firestoreApp().collection(CollectionName.DISCORD_USERS).doc(discordUser.id).set(discordUser)
  }
  const listings = Object.values(listingDocumentDataMock)
  for (const listing of listings) {
    await firestoreApp().collection(CollectionName.LISTINGS).doc(listing.id).set(listing)
  }
  const nftCollections = Object.values(nftCollectionDocumentDataMock)
  for (const collection of nftCollections) {
    await firestoreApp().collection(CollectionName.NFT_COLLECTIONS).doc(collection.id).set(collection)
  }
  const nfts = Object.values(nftDocumentDataMock)
  for (const nft of nfts) {
    await firestoreApp().collection(CollectionName.NFTS).doc(nft.id).set(nft)
  }
  const offers = Object.values(offerDocumentDataMock)
  for (const offer of offers) {
    await firestoreApp().collection(CollectionName.OFFERS).doc(offer.id).set(offer)
  }
  const sessions = Object.values(sessionDocumentDataMock)
  for (const session of sessions) {
    await firestoreApp().collection(CollectionName.SESSIONS).doc().set(session)
  }
  const users = Object.values(userDocumentDataMock)
  for (const user of users) {
    await firestoreApp().collection(CollectionName.USERS).doc(user.id).set(user)
  }
  const wallets = Object.values(walletDocumentDataMock)
  for (const wallet of wallets) {
    await firestoreApp().collection(CollectionName.WALLETS).doc(wallet.id).set(wallet)
  }
}
