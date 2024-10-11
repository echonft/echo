import { getLogger } from '@echo/firestore-functions/helper/get-logger'
import { setMaxInstances } from '@echo/firestore-functions/helper/set-max-instances'
import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsForWallet } from '@echo/firestore/crud/nft/get-nfts-for-wallet'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { updateNftOwner } from '@echo/tasks/update-nft-owner'
import { updateNftsForWallet } from '@echo/tasks/update-nfts-for-wallet'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { DocumentSnapshot } from 'firebase-admin/firestore'
import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { andThen, assoc, invoker, isNil, objOf, otherwise, pipe } from 'ramda'

export const onWalletWritten = onDocumentWritten(
  setMaxInstances({ document: 'wallets/{id}', timeoutSeconds: 540 }),
  async (event) => {
    const logger = getLogger().child({ function: 'onWalletWritten' })
    const change = event.data
    if (!isNil(change)) {
      if (change.after.exists) {
        // wallet was created
        const wallet = getDocumentSnapshotData(change.after as DocumentSnapshot<WalletDocumentData, WalletDocumentData>)
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
              await updateNftsForWallet({ wallet, fetch, logger })
            } catch (err) {
              logger.error({ err, wallet }, 'error updating NFTs for wallet')
            }
          }
        }
      } else if (change.before.exists) {
        // wallet was deleted
        const wallet = getDocumentSnapshotData(
          change.before as DocumentSnapshot<WalletDocumentData, WalletDocumentData>
        )
        if (!isNil(wallet)) {
          logger.info({ wallet }, 'wallet was deleted')
          try {
            const nfts = await pipe(
              getNftsForWallet,
              otherwise((err: unknown) => {
                logger.error({ err, wallet }, 'could not get NFTs for wallet')
                return []
              })
            )({ wallet })
            for (const nft of nfts) {
              await pipe(
                getNftSnapshot,
                andThen(
                  unlessNil(
                    pipe(
                      invoker(0, 'data'),
                      objOf('nft'),
                      assoc('wallet', undefined),
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
