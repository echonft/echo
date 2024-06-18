export { expireListing } from '@echo/firestore-functions/functions/expire-listing'
export { expireOffer } from '@echo/firestore-functions/functions/expire-offer'
export { onListingCreated } from '@echo/firestore-functions/functions/on-listing-created'
export { onOfferCreated } from '@echo/firestore-functions/functions/on-offer-created'
export { onWalletWritten } from '@echo/firestore-functions/functions/on-wallet-written'
import { initializeApp } from 'firebase-admin/app'
import { initializeFirestore } from 'firebase-admin/firestore'

const firestore = initializeFirestore(initializeApp())
firestore.settings({ ignoreUndefinedProperties: true })
