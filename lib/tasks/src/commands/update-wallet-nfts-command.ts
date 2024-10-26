import { getWallet } from '@echo/firestore/crud/wallet/get-wallet'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { chains } from '@echo/model/constants/chain'
import type { Contract } from '@echo/model/types/contract'
import { error, info } from '@echo/tasks/helpers/logger'
import { updateNftsForWallet } from '@echo/tasks/tasks/update-nfts-for-wallet'
import { andThen, isNil, otherwise, pipe, tap } from 'ramda'

export async function updateWalletNftsCommand(wallet: Contract) {
  await initializeFirebase()
  const walletDocument = await pipe(
    getWallet,
    andThen(
      tap((wallet) => {
        if (isNil(wallet)) {
          error({ wallet }, 'wallet not found')
        }
      })
    ),
    otherwise((err) => {
      error({ err, wallet }, 'could not fetch wallet from Firestore')
      return undefined
    })
  )({ address: wallet.address, vm: chains[wallet.chain].vm })
  if (!isNil(walletDocument)) {
    await pipe(
      updateNftsForWallet,
      andThen(() => {
        info({ wallet }, 'updated NFTs for wallet')
      }),
      otherwise((err) => {
        error({ err, wallet }, 'could not update NFTs')
      })
    )(walletDocument)
  }
}
