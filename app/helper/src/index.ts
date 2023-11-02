import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { updateAllNfts } from '@echo/helper/services/nft/update-all-nfts'

void (async function () {
  initializeFirebase()
  await updateAllNfts()
})()
