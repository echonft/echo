import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { getAllNfts } from '@echo/firestore/crud/nft/get-all-nfts'
import { getAllNftCollections } from '@echo/firestore/crud/nft-collection/get-all-nft-collections'
import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { getAllWallets } from '@echo/firestore/crud/wallet/get-all-wallets'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { updateNftCollection } from '@echo/firestore-mocks/nft-collection/update-nft-collection'
import { uncheckedUpdateListing } from '@test-utils/listing/unchecked-update-listing'
import { uncheckedUpdateNft } from '@test-utils/nft/unchecked-update-nft'
import { uncheckedUpdateOffer } from '@test-utils/offer/unchecked-update-offer'
import { uncheckedUpdateWallet } from '@test-utils/wallet/unchecked-update-wallet'
import { assoc, converge, lens, map, modify, modifyPath, omit, over, pick, pipe, prop } from 'ramda'
import { getAddress } from 'viem'

const updateAddressLens = lens(pick(['chainId', 'address']), assoc('address'))
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const updateAddress = over(updateAddressLens, converge(getAddress, [prop('address'), prop('chainId')]))

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
    )(listing) as FirestoreListing
    await uncheckedUpdateListing(listing.id, updateData)
  }
  // fix nft collections addresses
  const nftCollections = await getAllNftCollections()
  for (const nftCollection of nftCollections) {
    const updateData = pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      modify('contract', updateAddress),
      omit(['id'])
    )(nftCollection) as FirestoreNftCollection
    await updateNftCollection(nftCollection.id, updateData)
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
    )(nft) as FirestoreNft
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
    )(offer) as FirestoreOffer
    await uncheckedUpdateOffer(offer.id, updateData)
  }
  // fix wallets addresses
  const wallets = await getAllWallets()
  for (const wallet of wallets) {
    const updateData = pipe(updateAddress, omit(['id']))(wallet) as FirestoreWallet
    await uncheckedUpdateWallet(wallet.id, updateData)
  }
  await terminateFirestore()
})()
