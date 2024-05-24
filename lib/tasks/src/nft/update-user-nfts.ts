import { addCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollection as getCollectionFromFirestore } from '@echo/firestore/crud/collection/get-collection'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user'
import type { Wallet } from '@echo/model/types/wallet'
import { getCollection as getCollectionFromOpensea } from '@echo/opensea/services/get-collection'
import { getNftsByAccount, type GetNftsByAccountArgs } from '@echo/opensea/services/get-nfts-by-account'
import { PROMISE_POOL_CONCURRENCY } from '@echo/tasks/constants/promise-pool-concurrency'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import type { Nullable } from '@echo/utils/types/nullable'
import { PromisePool } from '@supercharge/promise-pool'
import { andThen, assoc, equals, isNil, pick, pipe, prop } from 'ramda'

async function getCollection(slug: Slug): Promise<Collection> {
  const collection = await getCollectionFromFirestore(slug)
  if (isNil(collection)) {
    return pipe(
      getCollectionFromOpensea,
      andThen(pipe(assoc('verified', false), addCollection, andThen(prop('data'))))
    )({ fetch, slug })
  }
  return collection
}

export async function updateUserNfts(user: UserDocumentData, wallet: WalletDocumentData, logger?: LoggerInterface) {
  const owner: User = getUserFromFirestoreData(user, wallet)
  try {
    const nfts = await pipe<[WalletDocumentData], Wallet, GetNftsByAccountArgs, ReturnType<typeof getNftsByAccount>>(
      pick(['address', 'chain']),
      assoc('fetch', fetch),
      getNftsByAccount
    )(wallet)
    await PromisePool.withConcurrency(PROMISE_POOL_CONCURRENCY)
      .for(nfts)
      .process(async (nft) => {
        try {
          // check if collection exists, if not add it, else set it in the nft
          const collection = await getCollection(nft.collection.slug)
          const existingNft: Nullable<Nft> = await pipe(getNftIndex, getNft)(nft)
          if (isNil(existingNft)) {
            logger?.info(`nft ${nft.collection.slug} #${nft.tokenId} is not in the database, adding...`)
            try {
              await pipe<
                [
                  Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & {
                    collection: Pick<Collection, 'slug'>
                  }
                ],
                Omit<Nft, 'owner' | 'updatedAt'>,
                Omit<Nft, 'updatedAt'>,
                Promise<NewDocument<Nft>>
              >(
                assoc('collection', collection),
                assoc('owner', owner),
                addNft
              )(nft)
            } catch (e) {
              logger?.error(`error adding nft ${nft.collection.slug} #${nft.tokenId}: ${errorMessage(e)}`)
            }
            logger?.info(`added nft ${nft.collection.slug} #${nft.tokenId}`)
          } else if (!equals(existingNft.owner.wallet, owner.wallet)) {
            logger?.warn(
              `nft ${existingNft.collection.slug} #${existingNft.tokenId} is not owned by ${existingNft.owner.wallet.address} anymore, updating owner...`
            )
            try {
              await pipe(assoc('owner', owner), updateNft)(existingNft)
              logger?.info(
                `updated owner of nft ${existingNft.collection.slug} #${existingNft.tokenId} to ${owner.wallet.address}`
              )
            } catch (e) {
              logger?.error(`error setting new owner of nft ${nft.collection.slug} #${nft.tokenId}: ${errorMessage(e)}`)
            }
          }
        } catch (e) {
          logger?.error(`error getting NFT ${nft.collection.slug} #${nft.tokenId}}: ${errorMessage(e)}`)
        }
      })
  } catch (e) {
    logger?.error(`error fetching NFTs for owner ${wallet.address}: ${errorMessage(e)}`)
  }
}
