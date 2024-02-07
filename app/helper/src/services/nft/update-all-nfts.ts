import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import { deleteOutdatedNfts } from '@echo/helper/services/nft/delete-outdated-nfts'
import { updateUserNfts } from '@echo/helper/services/nft/update-user-nfts'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { now } from '@echo/utils/helpers/now'
import { andThen, map, pipe } from 'ramda'

export async function updateAllNfts() {
  const beforeUpdate = now()
  await pipe(getAllUsers, andThen(pipe(map(updateUserNfts), promiseAll)))()
  await deleteOutdatedNfts(beforeUpdate)
}
