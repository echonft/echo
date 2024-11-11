export { addCollectionNfts } from '@echo/firestore-functions/functions/add-collection-nfts'
export { addNft } from '@echo/firestore-functions/functions/add-nft'
export { expireListing } from '@echo/firestore-functions/functions/expire-listing'
export { expireOffer } from '@echo/firestore-functions/functions/expire-offer'
export { onCollectionCreated } from '@echo/firestore-functions/functions/on-collection-created'
export { onListingCreated } from '@echo/firestore-functions/functions/on-listing-created'
export { onOfferCreated } from '@echo/firestore-functions/functions/on-offer-created'
export { onUserWritten } from '@echo/firestore-functions/functions/on-user-written'
import { initializeApp } from 'firebase-admin/app'
import { initializeFirestore } from 'firebase-admin/firestore'

const firestore = initializeFirestore(initializeApp())
firestore.settings({ ignoreUndefinedProperties: true })
