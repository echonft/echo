import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { walletFromContract } from '@echo/model/helpers/wallet/wallet-from-contract'
import type { Contract } from '@echo/model/types/contract'
import { error, info } from '@echo/tasks/helpers/logger'
import { updateNftsForWallet } from '@echo/tasks/tasks/update-nfts-for-wallet'
import { andThen, otherwise, pipe } from 'ramda'

export async function updateWalletNftsCommand(wallet: Contract) {
  await initializeFirebase()
  return pipe(
    walletFromContract,
    updateNftsForWallet,
    andThen(() => {
      info({ wallet }, 'updated NFTs for wallet')
    }),
    otherwise((err) => {
      error({ err, wallet }, 'could not update NFTs')
    })
  )(wallet)
}
