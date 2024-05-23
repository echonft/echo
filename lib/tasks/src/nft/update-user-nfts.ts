import { getNftsForOwner } from '@echo/alchemy/services/get-nfts-for-owner'
import { getCollectionsPaginated } from '@echo/firestore/crud/collection/get-collections-paginated'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { PROMISE_POOL_CONCURRENCY } from '@echo/tasks/constants/promise-pool-concurrency'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import type { Nullable } from '@echo/utils/types/nullable'
import { PromisePool } from '@supercharge/promise-pool'
import { assoc, equals, inc, isNil, pipe } from 'ramda'

async function updateUserNftsForCollections(page: number, user: UserDocumentData, logger?: LoggerInterface) {
  const wallets = await getWalletsForUser(user.username)
  const { result: collections, hasNext } = await getCollectionsPaginated({ page })
  for (const wallet of wallets) {
    const owner: User = getUserFromFirestoreData(user, wallet)
    try {
      const nfts = await getNftsForOwner(collections, owner)
      await PromisePool.withConcurrency(PROMISE_POOL_CONCURRENCY)
        .for(nfts)
        .process(async (nft) => {
          // FIXME this is true only for ERC721
          try {
            const existingNft: Nullable<Nft> = await pipe(getNftIndex, getNft)(nft)
            if (isNil(existingNft)) {
              logger?.info(`nft ${nft.collection.slug} #${nft.tokenId} is not in the database, adding...`)
              try {
                await addNft(nft)
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
                logger?.error(
                  `error setting new owner of nft ${nft.collection.slug} #${nft.tokenId}: ${errorMessage(e)}`
                )
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
  if (hasNext) {
    return await updateUserNftsForCollections(inc(page), user, logger)
  }
  return
}

export function updateUserNfts(user: UserDocumentData, logger?: LoggerInterface) {
  return updateUserNftsForCollections(0, user, logger)
}
