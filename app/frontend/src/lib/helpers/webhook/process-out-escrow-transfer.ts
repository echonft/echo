import { deleteEscrowedNft } from '@echo/firestore/crud/escrowed-nft/delete-escrowed-nft'
import { addNftWithId } from '@echo/firestore/crud/nft/add-nft-with-id'
import { getEscrowedNftSnapshot } from '@echo/firestore/crud/nft/get-escrowed-nft-snapshot'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft } from '@echo/model/types/nft'
import { addCollection } from '@echo/tasks/add-collection'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, isNil, otherwise, pipe } from 'ramda'

// TODO
export async function processOutEscrowTransfer(args: WithLoggerType<Record<'nft', Nft>>): Promise<void> {
  const {
    nft: {
      tokenId,
      collection: { contract },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      owner: { wallet }
    },
    logger
  } = args
  const collection = await addCollection({ contract, fetch, logger })
  const nftIndex = getNftIndex({ collection, tokenId })
  const nftSnapshot = await pipe(
    getEscrowedNftSnapshot,
    otherwise((err) => {
      captureAndLogError(err, { logObject: { nft: nftIndex }, message: 'could not get escrowed NFT snapshot' })
      return undefined
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  )(nftIndex)
  if (isNil(nftSnapshot)) {
    return Promise.reject(new NotFoundError({ message: 'NFT snapshot not found', severity: 'warning' }))
  }
  const to = await pipe(
    getWalletByAddress,
    otherwise((err) => {
      captureAndLogError(err, { logObject: { wallet }, message: 'could not get wallet from Firestore' })
      return undefined
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  )(wallet)
  // wallet is not in the database, we simply delete the NFT in that case
  if (isNil(to)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    logger?.warn({ wallet }, 'target wallet not found in the database')
    await deleteEscrowedNft(nftSnapshot.id)
    logger?.warn({ nft: nftIndex }, 'deleted escrowed NFT')
  } else {
    const userDocumentData = await pipe(
      getUserById,
      otherwise((err) => {
        captureAndLogError(err, {
          logObject: { user: { id: to.userId } },
          message: 'could not get user from Firestore'
        })
        return undefined
      })
    )(to.userId)
    if (isNil(userDocumentData)) {
      return Promise.reject(new NotFoundError({ message: 'user not found', severity: 'warning' }))
    }
    // We add NFT back in the NFT database and remove the escrowed one
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const nft: NftWithId = {
      ...nftSnapshot.data(),
      id: nftSnapshot.id,
      owner: getUserFromFirestoreData({ user: userDocumentData, wallet: to })
    }
    await pipe(
      addNftWithId,
      andThen(({ id, data }) => {
        logger?.info({ nft: assoc('id', id, data) }, 'added NFT')
      })
    )(nft)
    await pipe(
      deleteEscrowedNft,
      andThen((id) => {
        logger?.info({ nft: { id } }, 'deleted escrowed NFT')
      })
    )(nftSnapshot.id)
  }
}
