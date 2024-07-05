import { deleteEscrowedNft } from '@echo/firestore/crud/escrowed-nft/delete-escrowed-nft'
import { getEscrowedNftSnapshot } from '@echo/firestore/crud/escrowed-nft/get-escrowed-nft'
import { addNftWithId } from '@echo/firestore/crud/nft/add-nft-with-id'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft } from '@echo/model/types/nft'
import { addCollection } from '@echo/tasks/add-collection'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isNil, otherwise, pipe } from 'ramda'

export async function processOutEscrowTransfer(args: WithLoggerType<Record<'nft', Nft>>): Promise<void> {
  const logger = args.logger?.child({ fn: processOutEscrowTransfer.name })
  const {
    nft: {
      tokenId,
      collection: { contract },
      owner: { wallet }
    }
  } = args
  const collection = await pipe(
    addCollection,
    otherwise((err) => {
      logger?.error({ err, collection: { contract } }, 'could not add collection')
      return undefined
    })
  )({ contract, fetch, logger })
  if (!isNil(collection)) {
    const nftIndex = getNftIndex({ collection, tokenId })
    const nftSnapshot = await pipe(
      getEscrowedNftSnapshot,
      otherwise((err) => {
        logger?.error({ err, nft: nftIndex }, 'could not get escrowed NFT snapshot')
        return undefined
      })
    )(nftIndex)
    if (!isNil(nftSnapshot)) {
      const to = await pipe(
        getWalletByAddress,
        otherwise((err) => {
          logger?.error({ err, wallet }, 'could not get wallet from Firestore')
          return undefined
        })
      )(wallet)
      // wallet is not in the database, we simply delete the NFT in that case
      if (isNil(to)) {
        logger?.warn({ wallet }, 'target wallet not found in the database')
        await pipe(
          deleteEscrowedNft,
          otherwise((err) => {
            logger?.error({ err, nft: nftIndex }, 'chould not delete escrowed NFT')
          })
        )(nftSnapshot.id)
        logger?.warn({ nft: nftIndex }, 'deleted escrowed NFT')
        return
      }
      const userDocumentData = await pipe(
        getUserById,
        otherwise((err) => {
          logger?.error({ err, user: { id: to.userId } }, 'could not get user from Firestore')
          return undefined
        })
      )(to.userId)
      if (!isNil(userDocumentData)) {
        const user = getUserFromFirestoreData({ user: userDocumentData, wallet: to })
        // We add NFT back in the NFT database and remove the escrowed one
        const nft: NftWithId = { ...nftSnapshot.data(), id: nftSnapshot.id, owner: user }
        await pipe(
          addNftWithId,
          otherwise((err) => {
            logger?.error({ err, nft }, 'could not add NFT')
            return undefined
          })
        )(nft)
        logger?.info({ nft }, 'added NFT')
        await pipe(
          deleteEscrowedNft,
          otherwise((err) => {
            logger?.error({ err, nft: { id: nftSnapshot.id } }, 'could not deleted escrowed NFT')
            return undefined
          })
        )(nftSnapshot.id)
        logger?.info({ nft: { id: nftSnapshot.id } }, 'deleted escrowed NFT')
      }
    }
    // TODO check this to make sure it didn't change
    // const to = await getWalletByAddress(wallet)
    // // wallet is not in the database, we simply delete the NFT in that case
    // if (isNil(to)) {
    //   logger?.warn({ fn: processOutEscrowTransfer.name, wallet }, 'target wallet not found in the database')
    //   await deleteEscrowedNft(nftSnapshot.id)
    //   logger?.warn({ fn: processOutEscrowTransfer.name, nft: nftIndex }, 'deleted escrowed NFT')
    //   return
    // }
    // const userDocumentData = await getUserById(to.userId)
    // if (isNil(userDocumentData)) {
    //   logger?.error({ fn: processOutEscrowTransfer.name, user: { id: to.userId } }, 'user not found')
    //   return
    // }
    // const user = getUserFromFirestoreData({ user: userDocumentData, wallet: to })
    // // We add NFT back in the NFT database and remove the escrowed one
    // const nft: NftWithId = { ...nftSnapshot.data(), id: nftSnapshot.id, owner: user }
    // await addNftWithId(nft)
    // logger?.info({ fn: processOutEscrowTransfer.name, nft }, 'added NFT')
    // await deleteEscrowedNft(nftSnapshot.id)
    // logger?.info({ fn: processOutEscrowTransfer.name, nft: { id: nftSnapshot.id } }, 'deleted escrowed NFT')
  }
}
