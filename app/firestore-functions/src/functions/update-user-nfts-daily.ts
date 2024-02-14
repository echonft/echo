import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getAllOutdatedNfts } from '@echo/firestore/crud/nft/get-all-outdated-nfts'
import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { updateUserNfts } from '@echo/firestore-functions/helper/update-user-nfts'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { now } from '@echo/utils/helpers/now'
import { PromisePool } from '@supercharge/promise-pool'
import { log } from 'firebase-functions/logger'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { andThen, map, pipe, prop } from 'ramda'

export const updateUserNftsDaily = onSchedule(setMaxInstances({ schedule: '0 0 * * *' }), async () => {
  log('Updating all users NFTs...')
  const beforeUpdate = now()
  const users = await getAllUsers()
  await PromisePool.withConcurrency(3)
    .for(users)
    .process(async (user) => {
      await updateUserNfts(user.id)
    })
  await pipe(getAllOutdatedNfts, andThen(pipe(map(pipe(prop('id'), deleteNft)), promiseAll)))(beforeUpdate)
})
