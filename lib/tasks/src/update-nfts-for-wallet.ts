import { getNft } from '@echo/firestore/crud/nft/get-nft'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { eqWallet } from '@echo/model/helpers/wallet/eq-wallet'
import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { addCollection } from '@echo/tasks/add-collection'
import { addNft } from '@echo/tasks/add-nft'
import { assessNftOwnershipForWallet } from '@echo/tasks/assess-nft-ownership-for-wallet'
import { changeNftOwnership } from '@echo/tasks/change-nft-ownership'
import { fetchNfts } from '@echo/tasks/fetch-nfts'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { assoc, head, isNil, map, otherwise, path, pipe } from 'ramda'

interface UpdateNftsForWalletArgs extends WithFetch {
  wallet: WalletDocumentData
}

/**
 * To update NFTs for a wallet, we query an NFT API to fetch the NFTs owned by the wallet, compare the results
 * against our database, and update it accordingly.
 * There are 3 scenarios possible here:
 * 1. The wallet acquired a new NFT that is not in our database
 *    => we add it to the database
 * 2. The wallet acquired an NFT that belonged to another wallet in our database (or vice versa)
 *    => we update the owner of the NFT
 * 3. The wallet transferred an NFT to a wallet that is not on our platform
 *    => we delete the NFT from the database
 * @param args
 */
export async function updateNftsForWallet(args: WithLoggerType<UpdateNftsForWalletArgs>): Promise<void> {
  const logger = args.logger?.child({ fn: updateNftsForWallet.name })
  const { wallet } = args
  logger?.info({ wallet }, 'started updating NFTs for wallet')
  const nftGroups = await pipe(
    assoc('logger', logger),
    fetchNfts,
    otherwise((err) => {
      logger?.error({ err, wallet }, 'could not fetch NFTs for wallet')
      return []
    })
  )(args)
  for (const nftGroup of nftGroups) {
    const contract = pipe<[PartialNft[]], PartialNft, Wallet>(
      head,
      nonNullableReturn(path(['collection', 'contract']))
    )(nftGroup)
    const collection = await pipe(
      addCollection,
      otherwise((err) => {
        logger?.error({ err, collection: { contract } }, 'could not add collection')
        return undefined
      })
    )({ contract, fetch: args.fetch, logger })
    if (!isNil(collection)) {
      const nftGroupWithCollection = map(assoc('collection', collection), nftGroup)
      for (const nft of nftGroupWithCollection) {
        try {
          logger?.info({ nft, wallet }, 'wallet owns NFT')
          const existingNft: Nullable<Nft> = await pipe(
            getNftIndex,
            getNft,
            otherwise((err) => {
              logger?.error({ err, nft }, 'could not get NFT from Firestore')
              return undefined
            })
          )(nft)
          if (isNil(existingNft)) {
            logger?.warn({ nft, wallet }, 'NFT is not in the database')
            await pipe(
              addNft,
              otherwise((err) => {
                logger?.error({ err, nft }, 'could not add NFT to the database')
              })
            )({ nft, wallet, logger })
          } else if (!eqWallet(existingNft.owner.wallet, wallet)) {
            logger?.warn({ nft, wallet }, 'NFT ownership changed')
            await pipe(
              changeNftOwnership,
              otherwise((err) => {
                logger?.error({ err, nft: existingNft }, 'could not update NFT ownership')
              })
            )({ nft: existingNft, wallet, logger })
          } else {
            logger?.info({ nft, wallet }, 'NFT is in the database with the right owner')
          }
        } catch (err) {
          logger?.error({ err, nft }, 'error getting NFT from database')
        }
      }
    }
  }
  await pipe(
    assessNftOwnershipForWallet,
    otherwise((err) => {
      logger?.error({ err, wallet }, 'could not assess NFT ownership for wallet')
    })
  )({ wallet, logger })
  logger?.info({ wallet }, 'done updating NFTs for wallet')
}
