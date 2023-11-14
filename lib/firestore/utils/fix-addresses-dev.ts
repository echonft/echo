import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { unchecked_updateCollection } from '@echo/firestore-test/collection/unchecked_update-collection'
import { unchecked_updateListing } from '@echo/firestore-test/listing/unchecked_update-listing'
import { getAllNfts } from '@echo/firestore-test/nft/get-all-nfts'
import { unchecked_updateNft } from '@echo/firestore-test/nft/unchecked_update-nft'
import { unchecked_updateOffer } from '@echo/firestore-test/offer/unchecked_update-offer'
import { getAllWallets } from '@echo/firestore-test/wallet/get-all-wallets'
import { unchecked_updateWallet } from '@echo/firestore-test/wallet/unchecked_update-wallet'
import { type Collection } from '@echo/model/types/collection'
import { type Listing } from '@echo/model/types/listing'
import { type Nft } from '@echo/model/types/nft'
import { type Offer } from '@echo/model/types/offer'
import type { HexString } from '@echo/utils/types/hex-string'
import { assoc, lens, map, modify, modifyPath, omit, over, partial, pipe, prop, toLower } from 'ramda'

const updateAddressLens = lens<object & Record<'address', HexString>, HexString>(prop('address'), assoc('address'))
const updateAddress = over<object & Record<'address', HexString>, HexString>(updateAddressLens, toLower<HexString>)

void (async function () {
  initializeFirebase()
  // fix listings addresses
  const listings = await getAllListings()
  for (const listing of listings) {
    const updateData = pipe(
      partial(modifyPath, [['creator', 'wallet'], updateAddress]),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('items', map(partial(modifyPath, [['nft', 'owner', 'wallet'], updateAddress]))),
      modify('targets', map(partial(modifyPath, [['collection', 'contract'], updateAddress]))),
      omit(['id'])
    )(listing)
    await unchecked_updateListing(listing.id, updateData as Omit<Listing, 'id'>)
  }
  // fix collections addresses
  const collections = await getAllCollections()
  for (const collection of collections) {
    const updateData = pipe(modify('contract', updateAddress), omit(['id']))(collection)
    await unchecked_updateCollection(collection.id, updateData as Omit<Collection, 'id'>)
  }
  // fix nfts addresses
  const nfts = await getAllNfts()
  for (const nft of nfts) {
    const updateData = pipe(
      partial(modifyPath, [['owner', 'wallet'], updateAddress]),
      partial(modifyPath, [['collection', 'contract'], updateAddress]),
      omit(['id'])
    )(nft)
    await unchecked_updateNft(nft.id, updateData as Omit<Nft, 'id'>)
  }
  // fix offers addresses
  const offers = await getAllOffers()
  for (const offer of offers) {
    const updateData = pipe(
      partial(modifyPath, [['receiver', 'wallet'], updateAddress]),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('receiverItems', map(partial(modifyPath, [['nft', 'owner', 'wallet'], updateAddress]))),
      partial(modifyPath, [['sender', 'wallet'], updateAddress]),
      modify('senderItems', map(partial(modifyPath, [['nft', 'owner', 'wallet'], updateAddress]))),
      omit(['id'])
    )(offer)
    await unchecked_updateOffer(offer.id, updateData as Omit<Offer, 'id'>)
  }
  // fix wallets addresses
  const wallets = await getAllWallets()
  for (const wallet of wallets) {
    const updateData = pipe(updateAddress, omit(['id']))(wallet)
    await unchecked_updateWallet(wallet.id, updateData as Omit<WalletDocumentData, 'id'>)
  }
  await terminateFirestore()
})()
