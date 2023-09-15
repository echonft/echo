import { deleteDiscordUser } from '@echo/firestore/crud/discord-user/delete-discord-user'
import { getAllDiscordUsers } from '@echo/firestore/crud/discord-user/get-all-discord-users'
import { deleteListing } from '@echo/firestore/crud/listing/delete-listing'
import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getAllNfts } from '@echo/firestore/crud/nft/get-all-nfts'
import { deleteNftCollection } from '@echo/firestore/crud/nft-collection/delete-nft-collection'
import { getAllNftCollections } from '@echo/firestore/crud/nft-collection/get-all-nft-collections'
import { deleteOffer } from '@echo/firestore/crud/offer/delete-offer'
import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { deleteSession } from '@echo/firestore/crud/session/delete-session'
import { getAllSessions } from '@echo/firestore/crud/session/get-all-sessions'
import { deleteUser } from '@echo/firestore/crud/user/delete-user'
import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getAllWallets } from '@echo/firestore/crud/wallet/get-all-wallets'

export async function clearDb() {
  const discordUsers = await getAllDiscordUsers()
  for (const discordUser of discordUsers) {
    try {
      await deleteDiscordUser(discordUser.id)
    } catch (e) {
      // nothing to do
    }
  }
  const listings = await getAllListings()
  for (const listing of listings) {
    try {
      await deleteListing(listing.id)
    } catch (e) {
      // nothing to do
    }
  }
  const nftCollections = await getAllNftCollections()
  for (const collection of nftCollections) {
    try {
      await deleteNftCollection(collection.id)
    } catch (e) {
      // nothing to do
    }
  }
  const nfts = await getAllNfts()
  for (const nft of nfts) {
    try {
      await deleteNft(nft.id)
    } catch (e) {
      // nothing to do
    }
  }
  const offers = await getAllOffers()
  for (const offer of offers) {
    try {
      await deleteOffer(offer.id)
    } catch (e) {
      // nothing to do
    }
  }
  const sessions = await getAllSessions()
  for (const session of sessions) {
    try {
      await deleteSession(session.userId)
    } catch (e) {
      // nothing to do
    }
  }
  const users = await getAllUsers()
  for (const user of users) {
    try {
      await deleteUser(user.id)
    } catch (e) {
      // nothing to do
    }
  }
  const wallets = await getAllWallets()
  for (const wallet of wallets) {
    try {
      await deleteWallet(wallet.id)
    } catch (e) {
      // nothing to do
    }
  }
}
