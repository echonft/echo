import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { updateNfts } from '@echo/tasks/nft/update-nfts'
import { pinoLogger } from '@echo/utils/services/pino-logger'

void (async function () {
  initializeFirebase()
  await updateNfts(pinoLogger)
  await terminateFirestore()
  process.exit()
})()
