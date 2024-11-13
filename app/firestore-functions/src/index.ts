export { expireListing } from '@echo/firestore-functions/functions/expire-listing'
export { expireOffer } from '@echo/firestore-functions/functions/expire-offer'
export { onCollectionCreated } from '@echo/firestore-functions/functions/on-collection-created'
export { onListingCreated } from '@echo/firestore-functions/functions/on-listing-created'
export { onNftUpdated } from '@echo/firestore-functions/functions/on-nft-updated'
export { onOfferCreated } from '@echo/firestore-functions/functions/on-offer-created'
export { onUserUpdated } from '@echo/firestore-functions/functions/on-user-updated'
import { initializeApp } from 'firebase-admin/app'
import { initializeFirestore } from 'firebase-admin/firestore'

const firestore = initializeFirestore(initializeApp())
firestore.settings({ ignoreUndefinedProperties: true })
