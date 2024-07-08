import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { Wallet } from '@echo/model/types/wallet'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { addCollection } from '@echo/tasks/add-collection'
import { assessNftOwnershipForWallet } from '@echo/tasks/assess-nft-ownership-for-wallet'
import { fetchNfts } from '@echo/tasks/fetch-nfts'
import { updateNft } from '@echo/tasks/update-nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
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
  const { wallet, logger } = args
  logger?.info({ wallet }, 'started updating NFTs for wallet')
  const nftGroups = await fetchNfts(args)
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
        await pipe(
          updateNft,
          otherwise((err) => {
            logger?.error({ err, collection, nft, wallet }, 'could not update NFT')
          })
        )({ nft, collection, owner: { wallet } })
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
