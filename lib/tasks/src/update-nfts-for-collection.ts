import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { fetchNftsByContract, type FetchNftsByContractArgs } from '@echo/tasks/fetch-nfts-by-contract'
import { updateNftOwner, type UpdateNftOwnerArgs } from '@echo/tasks/update-nft-owner'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getNftOwner } from '@echo/web3/helpers/nft/get-nft-owner'
import { andThen, assoc, dissoc, equals, isNil, objOf, pipe } from 'ramda'

interface UpdateNftsForCollectionArgs extends WithFetch {
  collection: Collection
}

export async function updateNftsForCollection(args: WithLoggerType<UpdateNftsForCollectionArgs>): Promise<void> {
  const { collection, logger } = args
  logger?.info({ collection }, 'started updating NFTs for collection')
  const nfts = await pipe<
    [UpdateNftsForCollectionArgs],
    Omit<UpdateNftsForCollectionArgs, 'collection'>,
    FetchNftsByContractArgs,
    Promise<PartialNft[]>
  >(
    dissoc('collection'),
    assoc('contract', collection.contract),
    fetchNftsByContract
  )(args)
  for (const nft of nfts) {
    const ownerWallet = await getNftOwner(nft)
    const owner = await pipe(
      getUserByWallet,
      andThen(unlessNil(pipe(objOf('user'), assoc('wallet', ownerWallet), getUserFromFirestoreData)))
    )(ownerWallet)
    const firestoreNft = await getNftByIndex(assoc('collection', collection, nft))
    if (isNil(firestoreNft)) {
      const { id, data } = await pipe<
        [PartialNft],
        Omit<Nft, 'owner' | 'updatedAt'>,
        Omit<Nft, 'updatedAt'>,
        Promise<NewDocument<Nft>>
      >(
        assoc('collection', collection),
        assoc('owner', owner),
        addNft
      )(nft)
      logger?.info({ nft: assoc('id', id, data) }, 'added NFT')
    } else if (!equals(owner, firestoreNft.owner)) {
      if (isNil(owner)) {
        await pipe(
          assoc('collection', collection),
          removeNftOwner,
          andThen((nft) => {
            logger?.info({ nft }, 'removed NFT owner')
          })
        )(nft)
      } else {
        await pipe<
          [PartialNft],
          Omit<Nft, 'owner' | 'updatedAt'>,
          Record<'nft', Omit<Nft, 'owner' | 'updatedAt'>>,
          UpdateNftOwnerArgs,
          Promise<Nft>,
          Promise<void>
        >(
          assoc('collection', collection),
          objOf('nft'),
          assoc('wallet', ownerWallet),
          updateNftOwner,
          andThen((nft) => {
            logger?.info({ nft }, 'updated NFT owner')
          })
        )(nft)
      }
    }
  }
  logger?.info({ collection }, 'done updating NFTs for collection')
}
