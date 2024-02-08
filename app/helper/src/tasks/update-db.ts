import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { guardAsyncFn } from '@echo/helper/errors/guard-async-fn'
import { updateAllNfts } from '@echo/helper/services/nft/update-all-nfts'

export async function updateDb() {
  initializeFirebase()
  return guardAsyncFn(updateAllNfts, void 0)()
}
