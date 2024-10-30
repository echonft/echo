import { NftError } from '@echo/firestore-functions/constants/errors/nft-error'
import { error } from '@echo/firestore-functions/constants/logger'
import { getFirestoreEventData } from '@echo/firestore-functions/helpers/get-firestore-event-data'
import { setMaxInstances } from '@echo/firestore-functions/helpers/set-max-instances'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsForOwnerWallet } from '@echo/firestore/crud/nft/get-nfts-for-owner-wallet'
import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'
import { chainsForVirtualMachine } from '@echo/model/helpers/chain/chains-for-virtual-machine'
import type { Contract } from '@echo/model/types/contract'
import { updateNftOwner } from '@echo/tasks/tasks/update-nft-owner'
import { promiseAll } from '@echo/utils/helpers/promise-all'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import { onDocumentDeleted } from 'firebase-functions/v2/firestore'
import {
  always,
  andThen,
  applySpec,
  assoc,
  flatten,
  identity,
  invoker,
  isNil,
  map,
  objOf,
  otherwise,
  pipe
} from 'ramda'

export const onWalletDeleted = onDocumentDeleted(
  setMaxInstances({ document: `${CollectionPath.Wallets}/{id}`, timeoutSeconds: 540 }),
  async (event) => {
    const wallet = getFirestoreEventData<WalletDocument>(event)
    if (!isNil(wallet)) {
      const chains = chainsForVirtualMachine(wallet.vm)
      try {
        const nfts = await pipe(
          map(
            pipe(
              applySpec<Contract>({
                address: always(wallet.address),
                chain: identity
              }),
              getNftsForOwnerWallet
            )
          ),
          promiseAll,
          andThen(flatten),
          otherwise((err: unknown) => {
            error({ err, wallet }, NftError.GetForWallet)
            return []
          })
        )(chains)

        for (const nft of nfts) {
          await pipe(
            getNftSnapshot,
            andThen(
              unlessNil(
                pipe(
                  invoker(0, 'data'),
                  objOf('nft'),
                  assoc('ownerAddress', undefined),
                  updateNftOwner,
                  otherwise((err: unknown) => {
                    error({ err, nft }, NftError.RemoveOwner)
                  })
                )
              )
            ),
            otherwise((err: unknown) => {
              error({ err, nft }, NftError.Snapshot)
              return undefined
            })
          )(nft)
        }
      } catch (err) {
        error({ err, wallet }, NftError.UpdateForWallet)
      }
    }
  }
)
