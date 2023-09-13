import { deleteListing } from '@echo/firestore/crud/listing/delete-listing'
import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getAllNfts } from '@echo/firestore/crud/nft/get-all-nfts'
import { deleteNftCollection } from '@echo/firestore/crud/nft-collection/delete-nft-collection'
import { getAllNftCollections } from '@echo/firestore/crud/nft-collection/get-all-nft-collections'
import { deleteOffer } from '@echo/firestore/crud/offer/delete-offer'
import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { deleteUser } from '@echo/firestore/crud/user/delete-user'
import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'

export async function clearDb() {
  const listings = await getAllListings()
  for (const listing of listings) {
    await deleteListing(listing.id)
  }
  const nftCollections = await getAllNftCollections()
  for (const collection of nftCollections) {
    await deleteNftCollection(collection.id)
  }
  const nfts = await getAllNfts()
  for (const nft of nfts) {
    await deleteNft(nft.id)
  }
  const offers = await getAllOffers()
  for (const offer of offers) {
    await deleteOffer(offer.id)
  }
  const users = await getAllUsers()
  for (const user of users) {
    await deleteUser(user.id)
  }
}
