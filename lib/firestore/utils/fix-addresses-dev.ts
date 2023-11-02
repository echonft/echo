import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { type WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { type Collection } from '@echo/model/types/collection'
import { type Listing } from '@echo/model/types/listing'
import { type Nft } from '@echo/model/types/nft'
import { type Offer } from '@echo/model/types/offer'
import { formatAddress } from '@echo/utils/helpers/format-address'
import { uncheckedUpdateCollection } from '@test-utils/collection/unchecked-update-collection'
import { uncheckedUpdateListing } from '@test-utils/listing/unchecked-update-listing'
import { getAllNfts } from '@test-utils/nft/get-all-nfts'
import { uncheckedUpdateNft } from '@test-utils/nft/unchecked-update-nft'
import { uncheckedUpdateOffer } from '@test-utils/offer/unchecked-update-offer'
import { getAllWallets } from '@test-utils/wallet/get-all-wallets'
import { uncheckedUpdateWallet } from '@test-utils/wallet/unchecked-update-wallet'
import { assoc, converge, lens, map, modify, modifyPath, omit, over, pick, pipe, prop } from 'ramda'

const updateAddressLens = lens(pick(['chainId', 'address']), assoc('address'))
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const updateAddress = over(updateAddressLens, converge(formatAddress, [prop('address'), prop('chainId')]))

void (async function () {
  initializeFirebase()
  // fix listings addresses
  const listings = await getAllListings()
  for (const listing of listings) {
    const updateData = pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modifyPath(['creator', 'wallet'], updateAddress),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('items', map(modifyPath(['nft', 'owner', 'wallet'], updateAddress))),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('targets', map(modifyPath(['collection', 'contract'], updateAddress))),
      omit(['id'])
    )(listing) as Listing
    await uncheckedUpdateListing(listing.id, updateData)
  }
  // fix collections addresses
  const collections = await getAllCollections()
  for (const collection of collections) {
    const updateData = pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('contract', updateAddress),
      omit(['id'])
    )(collection) as Collection
    await uncheckedUpdateCollection(collection.id, updateData)
  }
  // fix nfts addresses
  const nfts = await getAllNfts()
  for (const nft of nfts) {
    const updateData = pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modifyPath(['owner', 'wallet'], updateAddress),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modifyPath(['collection', 'contract'], updateAddress),
      omit(['id'])
    )(nft) as Nft
    await uncheckedUpdateNft(nft.id, updateData)
  }
  // fix offers addresses
  const offers = await getAllOffers()
  for (const offer of offers) {
    const updateData = pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('receiverItems', map(modifyPath(['nft', 'owner', 'wallet'], updateAddress))),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('senderItems', map(modifyPath(['nft', 'owner', 'wallet'], updateAddress))),
      omit(['id'])
    )(offer) as Offer
    await uncheckedUpdateOffer(offer.id, updateData)
  }
  // fix wallets addresses
  const wallets = await getAllWallets()
  for (const wallet of wallets) {
    const updateData = pipe(updateAddress, omit(['id']))(wallet) as WalletDocumentData
    await uncheckedUpdateWallet(wallet.id, updateData)
  }
  await terminateFirestore()
})()
