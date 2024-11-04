import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Address } from '@echo/model/types/address'
import { error, info } from '@echo/tasks/helpers/logger'
import { updateNftsForWallet } from '@echo/tasks/tasks/update-nfts-for-wallet'
import { andThen, otherwise, pipe } from 'ramda'

export async function updateWalletNftsCommand(wallet: Address) {
  await initializeFirebase()
  return pipe(
    updateNftsForWallet,
    andThen(() => {
      info({ wallet }, 'updated NFTs for wallet')
    }),
    otherwise((err) => {
      error({ err, wallet }, 'could not update NFTs')
    })
  )(wallet)
}
