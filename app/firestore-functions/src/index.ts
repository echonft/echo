export { addCollection } from '@echo/firestore-functions/functions/add-collection'
export { addCollectionNfts } from '@echo/firestore-functions/functions/add-collection-nfts'
export { addNft } from '@echo/firestore-functions/functions/add-nft'
export { cancelListing } from '@echo/firestore-functions/functions/cancel-listing'
export { cancelNftListings } from '@echo/firestore-functions/functions/cancel-nft-listings'
export { cancelNftOffers } from '@echo/firestore-functions/functions/cancel-nft-offers'
export { cancelOffer } from '@echo/firestore-functions/functions/cancel-offer'
export { expireListing } from '@echo/firestore-functions/functions/expire-listing'
export { expireOffer } from '@echo/firestore-functions/functions/expire-offer'
export { onCollectionCreated } from '@echo/firestore-functions/functions/on-collection-created'
export { onListingCreated } from '@echo/firestore-functions/functions/on-listing-created'
export { onNftUpdated } from '@echo/firestore-functions/functions/on-nft-updated'
export { onOfferCreated } from '@echo/firestore-functions/functions/on-offer-created'
export { onUserUpdated } from '@echo/firestore-functions/functions/on-user-updated'
export { updateNftOwner } from '@echo/firestore-functions/functions/update-nft-owner'
import { initializeApp } from 'firebase-admin/app'
import { initializeFirestore } from 'firebase-admin/firestore'

const firestore = initializeFirestore(initializeApp())
firestore.settings({ ignoreUndefinedProperties: true })
