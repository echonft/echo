import { addCollection as addCollectionToFirestore } from '@echo/firestore/crud/collection/add-collection'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { fetchNftsByContract } from '@echo/tasks/fetch-nfts-by-contract'
import { getCollection } from '@echo/tasks/get-collection'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getNftOwner } from '@echo/web3/services/get-nft-owner'
import { andThen, assoc, isNil, objOf, otherwise, pipe } from 'ramda'

interface GetOrAddCollectionArgs extends WithFetch {
  contract: Wallet
}

/**
 * Retrieves the collection associated with a given contract or adds it to Firestore if it does not exist already
 * @param args
 * @throws Error returns a rejected promise if the collection is not found
 * @throws Error returns a rejected promise if the collection could not have been added to Firestore
 */
export async function getOrAddCollection(args: WithLoggerType<GetOrAddCollectionArgs>): Promise<Collection> {
  const { collection, source } = await getCollection(args)
  if (isNil(collection)) {
    return Promise.reject(Error('collection not found'))
  }
  if (source === 'api') {
    const { data, id } = await addCollectionToFirestore(collection)
    args.logger?.info({ collection: assoc('id', id, data) }, 'added collection')
    // add collection NFTs
    const nfts = await fetchNftsByContract(args)
    for (const nft of nfts) {
      const ownerWallet = await getNftOwner(nft)
      const owner = await pipe(
        getUserByWallet,
        andThen(unlessNil(pipe(objOf('user'), assoc('wallet', ownerWallet), getUserFromFirestoreData)))
      )(ownerWallet)
      await pipe<
        [PartialNft],
        Omit<Nft, 'owner' | 'updatedAt'>,
        Omit<Nft, 'updatedAt'>,
        Promise<NewDocument<Nft>>,
        Promise<NewDocument<Nft>>
      >(
        assoc('collection', collection),
        assoc('owner', owner),
        addNft,
        otherwise((err) => {
          args.logger?.error({ nft, collection, err }, 'could not add NFT')
        })
      )(nft)
    }
    args.logger?.info({ collection: assoc('id', id, data) }, `added ${nfts.length} collection NFTs`)
  }
  return collection
}
