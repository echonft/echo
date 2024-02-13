import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getAllOutdatedNfts } from '@echo/firestore/crud/nft/get-all-outdated-nfts'
import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { updateUserNfts } from '@echo/firestore-functions/helper/update-user-nfts'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { now } from '@echo/utils/helpers/now'
import { initializeApp } from 'firebase-admin/app'
import { log } from 'firebase-functions/logger'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { setGlobalOptions } from 'firebase-functions/v2/options'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { always, andThen, ifElse, isNil, map, pipe, prop } from 'ramda'

initializeApp()
setGlobalOptions({ maxInstances: 10 })

export const updateUserNftsDaily = onSchedule({ schedule: '0 0 * * *' }, async () => {
  log('Updating all users NFTs...')
  const beforeUpdate = now()
  const users = await getAllUsers()
  for (const user of users) {
    await updateUserNfts(user.id)
  }
  await pipe(getAllOutdatedNfts, andThen(pipe(map(pipe(prop('id'), deleteNft)), promiseAll)))(beforeUpdate)
})
export const updateUserNftsOnAddWallet = onDocumentWritten('wallets/{id}', async (event) => {
  await pipe(
    prop('data'),
    ifElse(
      isNil,
      always(Promise.resolve()),
      pipe(
        ifElse(
          propIsNil('before'),
          pipe(prop('after'), getDocumentSnapshotData<WalletDocumentData>),
          pipe(prop('before'), getDocumentSnapshotData<WalletDocumentData>)
        ),
        ifElse(isNil, always(Promise.resolve()), pipe(prop('userId'), updateUserNfts))
      )
    )
  )(event)
})
