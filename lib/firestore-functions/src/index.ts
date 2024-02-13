import { updateAllUsersNfts } from '@echo/firestore-functions/helper/update-all-users-nfts'
import { initializeApp } from 'firebase-admin/app'
import { log } from 'firebase-functions/logger'
import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore'
import { setGlobalOptions } from 'firebase-functions/v2/options'
import { onSchedule } from 'firebase-functions/v2/scheduler'

initializeApp()
setGlobalOptions({ maxInstances: 10 })

export const updateUserNftsDaily = onSchedule({ schedule: '0 0 * * *' }, async () => {
  log('Updating all users NFTs...')
  await updateAllUsersNfts()
})

// TODO Not 100% sure the syntax is correct for documents but should be it.
// See https://firebase.google.com/docs/functions/firestore-events?gen=2nd
export const updateUserNftsOnCreation = onDocumentCreated('wallets/{docs}', (_event) => {
  // TODO Add method to update the NFTs for the new wallet. The `event` object should have the QuerySnapshot via the data param.
  // event.data.data() should be the wallet
})
export const updateUserNftsOnDeletion = onDocumentDeleted('wallets/{docs}', (_event) => {
  // TODO Add method to remove the NFTs for the deleted wallet.
})
