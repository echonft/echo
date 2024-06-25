import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { getWalletOwner } from '@echo/firestore/crud/wallet/get-wallet-owner'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { eqWallet } from '@echo/model/helpers/wallet/eq-wallet'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { getNftsByAccount as getNftsFromNftScan } from '@echo/nft-scan/services/get-nfts-by-account'
import { getNftsByAccount as getNftsFromOpensea } from '@echo/opensea/services/get-nfts-by-account'
import { updateCollection } from '@echo/tasks/update-collection'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, collectBy, head, isNil, map, path, pick, pipe, prop } from 'ramda'

type PartialNft = Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & {
  collection: Pick<Collection, 'contract'>
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
export async function updateNftsForWallet(args: WithLoggerType<Record<'wallet', WalletDocumentData>>) {
  const { wallet, logger } = args
  try {
    const fetcher = isTestnetChain(wallet.chain) ? getNftsFromOpensea : getNftsFromNftScan
    const groupedNfts = await pipe(
      assoc('fetch', fetch),
      fetcher,
      andThen(collectBy(nonNullableReturn<[PartialNft], string>(path(['collection', 'contract', 'address']))))
    )({ wallet })
    for (const nftGroup of groupedNfts) {
      const collection = await pipe<
        [PartialNft[]],
        PartialNft,
        Pick<Collection, 'contract'>,
        Pick<Collection, 'contract'>,
        WithLoggerType<Record<'contract', Wallet>>,
        Promise<Nullable<Omit<Collection, 'swapsCount'>>>
      >(
        head,
        prop('collection'),
        pick(['contract']),
        assoc('logger', logger),
        updateCollection
      )(nftGroup)
      // we first check for the NFTs actually owned by the wallet
      if (!isNil(collection)) {
        const nftGroupWithCollection = map(assoc('collection', collection), nftGroup)
        for (const nft of nftGroupWithCollection) {
          try {
            const user = await getWalletOwner(wallet)
            logger?.info({ nft, wallet }, 'wallet owns NFT')
            const existingNft: Nullable<Nft> = await pipe(getNftIndex, getNft)(nft)
            if (isNil(existingNft)) {
              logger?.warn({ nft, wallet }, 'NFT is not in the database')
              try {
                if (isNil(user)) {
                  logger?.error({ nft, wallet }, 'cannot add NFT because no owner found for the wallet')
                } else {
                  await pipe<[Omit<Nft, 'owner' | 'updatedAt'>], Omit<Nft, 'updatedAt'>, Promise<NewDocument<Nft>>>(
                    assoc('owner', getUserFromFirestoreData(user, wallet)),
                    addNft
                  )(nft)
                  logger?.warn({ nft }, 'added NFT to the database')
                }
              } catch (err) {
                logger?.error({ err, nft }, 'could not add NFT to the database')
              }
            } else if (!eqWallet(existingNft.owner.wallet, wallet)) {
              logger?.warn({ nft, wallet }, 'NFT ownership changed')
              try {
                if (isNil(user)) {
                  logger?.error({ nft, wallet }, 'cannot add NFT because no owner found for the wallet')
                } else {
                  const updatedNft = await pipe(
                    assoc('owner', getUserFromFirestoreData(user, wallet)),
                    updateNft
                  )(existingNft)
                  logger?.warn({ nft: updatedNft }, 'updated NFT ownership')
                }
              } catch (err) {
                logger?.error({ err, nft }, 'could not update NFT ownership')
              }
            } else {
              logger?.info({ nft, wallet }, 'NFT is in the database with the right owner')
            }
          } catch (err) {
            logger?.error({ err, nft }, 'error getting NFT from database')
          }
        }
        // we then check for any NFTs that are owned by the wallet in the database, but not according to the API
        // TODO add back later
        // const ownedNfts = await getNftsForWalletAndCollection({ collection, wallet })
        // for (const ownedNft of ownedNfts) {
        //   logger?.info({ nft: ownedNft }, 'checking if NFT is in response')
        //   if (!includesWith(ownedNft, eqNft, nftGroupWithCollection as Nft[])) {
        //     logger?.warn({ nft: ownedNft }, 'NFT is not in response')
        //     try {
        //       logger?.warn({ nft: ownedNft, wallet }, 'NFT is in the database, but actual owner is not')
        //       const snapshot = await getNftSnapshot(getNftIndex(ownedNft))
        //       if (isNil(snapshot)) {
        //         logger?.error({ nft: ownedNft }, 'could not deleted NFT from database')
        //       } else {
        //         await deleteNft(snapshot.id)
        //         logger?.warn({ nft: ownedNft }, 'deleted NFT from database')
        //       }
        //     } catch (err) {
        //       logger?.error({ err, nft: ownedNft }, 'could not deleted NFT from database')
        //     }
        //   } else {
        //     logger?.info({ nft: ownedNft }, 'NFT is in response')
        //   }
        // }
      }
    }
  } catch (err) {
    logger?.error({ err, wallet }, 'error fetching NFTs')
  }
}
