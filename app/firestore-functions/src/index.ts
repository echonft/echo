export { deleteExpiredNonce } from '@echo/firestore-functions/functions/delete-expired-nonce'
export { expireListing } from '@echo/firestore-functions/functions/expire-listing'
export { expireOffer } from '@echo/firestore-functions/functions/expire-offer'
export { onListingCreated } from '@echo/firestore-functions/functions/on-listing-created'
export { onOfferCreated } from '@echo/firestore-functions/functions/on-offer-created'
export { onWalletCreated } from '@echo/firestore-functions/functions/on-wallet-created'
export { onWalletDeleted } from '@echo/firestore-functions/functions/on-wallet-deleted'
export { onNonceCreated } from '@echo/firestore-functions/functions/on-nonce-created'
import { initializeApp } from 'firebase-admin/app'
import { initializeFirestore } from 'firebase-admin/firestore'

const firestore = initializeFirestore(initializeApp())
firestore.settings({ ignoreUndefinedProperties: true })
