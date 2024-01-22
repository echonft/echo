import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { unchecked_updateCollection } from '@echo/firestore-test/collection/unchecked_update-collection'
import { unchecked_updateListing } from '@echo/firestore-test/listing/unchecked_update-listing'
import { getAllNfts } from '@echo/firestore-test/nft/get-all-nfts'
import { unchecked_updateNft } from '@echo/firestore-test/nft/unchecked_update-nft'
import { getAllOffers } from '@echo/firestore-test/offer/get-all-offers'
import { unchecked_updateOffer } from '@echo/firestore-test/offer/unchecked_update-offer'
import { getAllWallets } from '@echo/firestore-test/wallet/get-all-wallets'
import { unchecked_updateWallet } from '@echo/firestore-test/wallet/unchecked_update-wallet'
import { type Collection } from '@echo/model/types/collection'
import type { Contract } from '@echo/model/types/contract'
import { type Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { type Nft } from '@echo/model/types/nft'
import { type Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { pipeableModifyPath } from '@echo/utils/fp/pipeable-modify-path'
import type { HexString } from '@echo/utils/types/hex-string'
import { assoc, lens, map, modify, omit, over, pipe, prop, toLower } from 'ramda'

type LensType<T> = T & Record<'address', HexString | Lowercase<HexString>>
function updateAddressLens<T>() {
  return lens<LensType<T>, HexString | Lowercase<HexString>>(prop('address'), assoc('address'))
}
function updateAddress<T>(obj: LensType<T>) {
  return over<LensType<T>, HexString | Lowercase<HexString>>(updateAddressLens<T>(), toLower<HexString>)(obj)
}

void (async function () {
  initializeFirebase()
  // fix listings addresses
  const listings = await getAllListings()
  for (const listing of listings) {
    const updateData = pipe<[Listing], Listing, Listing, Listing, Omit<Listing, 'id'>>(
      pipeableModifyPath(['creator', 'wallet'], updateAddress),
      modify('items', map<ListingItem, ListingItem>(pipeableModifyPath(['nft', 'owner', 'wallet'], updateAddress))),
      modify(
        'targets',
        map<ListingTarget, ListingTarget>(pipeableModifyPath(['collection', 'contract'], updateAddress))
      ),
      omit(['id'])
    )(listing)
    await unchecked_updateListing(listing.id, updateData)
  }
  // fix collections addresses
  const collections = await getAllCollections()
  for (const collection of collections) {
    const updateData = pipe<[Collection], Collection, Omit<Collection, 'id'>>(
      modify('contract', updateAddress<Contract>),
      omit(['id'])
    )(collection)
    await unchecked_updateCollection(collection.id, updateData)
  }
  // fix nfts addresses
  const nfts = await getAllNfts()
  for (const nft of nfts) {
    const updateData = pipe<[Nft], Nft, Nft, Omit<Nft, 'id'>>(
      pipeableModifyPath(['owner', 'wallet'], updateAddress),
      pipeableModifyPath(['collection', 'contract'], updateAddress),
      omit(['id'])
    )(nft)
    await unchecked_updateNft(nft.id, updateData)
  }
  // fix offers addresses
  const offers = await getAllOffers()
  for (const offer of offers) {
    const updateData = pipe<[Offer], Offer, Offer, Offer, Offer, Omit<Offer, 'id'>>(
      pipeableModifyPath(['receiver', 'wallet'], updateAddress),
      modify('receiverItems', map<OfferItem, OfferItem>(pipeableModifyPath(['nft', 'owner', 'wallet'], updateAddress))),
      pipeableModifyPath(['sender', 'wallet'], updateAddress),
      modify('senderItems', map<OfferItem, OfferItem>(pipeableModifyPath(['nft', 'owner', 'wallet'], updateAddress))),
      omit(['id'])
    )(offer)
    await unchecked_updateOffer(offer.id, updateData)
  }
  // fix wallets addresses
  const wallets = await getAllWallets()
  for (const wallet of wallets) {
    const updateData = pipe<[WalletDocumentData], WalletDocumentData, Omit<WalletDocumentData, 'id'>>(
      updateAddress,
      omit(['id'])
    )(wallet)
    await unchecked_updateWallet(wallet.id, updateData)
  }
  await terminateFirestore()
})()
