import { deleteListing } from '../../src/crud/listing/delete-listing'
import { getAllListings } from '../../src/crud/listing/get-all-listings'
import { deleteNft } from '../../src/crud/nft/delete-nft'
import { getAllNfts } from '../../src/crud/nft/get-all-nfts'
import { deleteNftCollection } from '../../src/crud/nft-collection/delete-nft-collection'
import { getAllNftCollections } from '../../src/crud/nft-collection/get-all-nft-collections'
import { deleteOffer } from '../../src/crud/offer/delete-offer'
import { getAllOffers } from '../../src/crud/offer/get-all-offers'
import { deleteUser } from '../../src/crud/user/delete-user'
import { getAllUsers } from '../../src/crud/user/get-all-users'

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
