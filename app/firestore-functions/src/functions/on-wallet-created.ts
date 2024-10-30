import { NftError } from '@echo/firestore-functions/constants/errors/nft-error'
import { error } from '@echo/firestore-functions/constants/logger'
import { getFirestoreEventData } from '@echo/firestore-functions/helpers/get-firestore-event-data'
import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'
import { UserError } from '@echo/model/constants/errors/user-error'
import { updateNftsForWallet } from '@echo/tasks/tasks/update-nfts-for-wallet'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { isNil, otherwise, pipe } from 'ramda'

export const onWalletCreated = onDocumentCreated(
  setMaxInstances({ document: `${CollectionPath.Wallets}/{id}`, timeoutSeconds: 540 }),
  async (event) => {
    const wallet = getFirestoreEventData<WalletDocument>(event)
    if (!isNil(wallet)) {
      const foundUser = await pipe(
        getUserById,
        otherwise((err) => {
          error({ err, wallet, user: { id: wallet.userId } }, UserError.NotFound)
          return undefined
        })
      )(wallet.userId)
      if (!isNil(foundUser)) {
        try {
          await updateNftsForWallet(wallet)
        } catch (err) {
          error({ err, wallet }, NftError.UpdateForWallet)
        }
      }
    }
  }
)
