import { getLogger } from '@echo/firestore-functions/helper/get-logger'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsForOwnerWallet } from '@echo/firestore/crud/nft/get-nfts-for-owner-wallet'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'
import { chainsForVirtualMachine } from '@echo/model/helpers/chain/chains-for-virtual-machine'
import type { Contract } from '@echo/model/types/contract'
import { updateNftOwner } from '@echo/tasks/tasks/update-nft-owner'
import { updateNftsForWallet } from '@echo/tasks/tasks/update-nfts-for-wallet'
import { promiseAll } from '@echo/utils/helpers/promise-all'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import { DocumentSnapshot } from 'firebase-admin/firestore'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
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

export const onWalletWritten = onDocumentWritten(
  setMaxInstances({ document: 'wallets/{id}', timeoutSeconds: 540 }),
  async (event) => {
    const logger = getLogger().child({ function: 'onWalletWritten' })
    const change = event.data
    if (!isNil(change)) {
      if (change.after.exists) {
        // wallet was created
        const wallet = getDocumentSnapshotData(change.after as DocumentSnapshot<WalletDocument>)
        if (!isNil(wallet)) {
          logger.info({ wallet }, 'wallet was added')
          const foundUser = await pipe(
            getUserById,
            otherwise((err) => {
              logger.error({ err, user: { id: wallet.userId } }, 'could not get user')
              return undefined
            })
          )(wallet.userId)
          if (!isNil(foundUser)) {
            try {
              await updateNftsForWallet(wallet)
            } catch (err) {
              logger.error({ err, wallet }, 'error updating NFTs for wallet')
            }
          }
        }
      } else if (change.before.exists) {
        // wallet was deleted
        const wallet = getDocumentSnapshotData(change.before as DocumentSnapshot<WalletDocument>)
        if (!isNil(wallet)) {
          logger.info({ wallet }, 'wallet was deleted')
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
                logger.error({ err, wallet }, 'could not get NFTs for wallet')
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
                        logger.error({ err, nft }, 'could not remove NFT owner')
                      }),
                      andThen(() => {
                        logger.info({ nft }, 'removed NFT owner')
                      })
                    )
                  )
                ),
                otherwise((err: unknown) => {
                  logger.error({ err, nft }, 'could not get NFT snapshot')
                  return undefined
                })
              )(nft)
            }
          } catch (err) {
            logger.error({ err, wallet }, 'error removing NFTs for wallet')
          }
        }
      }
    }
  }
)
