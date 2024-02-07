import { deleteOutdatedNfts } from '@echo/helper/services/nft/delete-outdated-nfts'
import { updateUserNfts } from '@echo/helper/services/nft/update-user-nfts'
import { getAllUsersWithWallet } from '@echo/helper/services/user/get-all-users-with-wallet'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { now } from '@echo/utils/helpers/now'
import { map, pipe } from 'ramda'

export async function updateAllNfts() {
  const beforeUpdate = now()
  const usersWithWallet = await getAllUsersWithWallet()
  await pipe(map(updateUserNfts), promiseAll)(usersWithWallet)
  await deleteOutdatedNfts(beforeUpdate)
}
