import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { updateUserNfts } from '@echo/helper/services/nft/update-user-nfts'
import { getAllUsersWithWallet } from '@echo/helper/services/user/get-all-users-with-wallet'
import type { Wallet } from '@echo/model/types/wallet'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { map, omit, path, pipe } from 'ramda'

export async function updateAllNfts() {
  // Not doing for now as it will delete the NFTs that are devs
  // const beforeUpdate = now()
  const usersWithWallet = await getAllUsersWithWallet()
  // TODO functional program this
  // await pipe(
  //   map(converge(updateUserNfts, [omit(['wallet']), nonNullableReturn(path(['wallet.chainId', 'wallet.address']))])),
  //   promiseAll
  // )(usersWithWallet)
  // Update all users
  await pipe(
    map((userWithWallet: UserDocumentData & Record<'wallet', Wallet>) =>
      updateUserNfts(omit(['wallet'], userWithWallet), path(['wallet'], userWithWallet))
    ),
    promiseAll
  )(usersWithWallet)
  // Not doing for now as it will delete the NFTs that are devs
  // await deleteOutdatedNfts(beforeUpdate)
}
