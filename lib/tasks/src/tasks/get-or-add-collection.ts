import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { addCollection as addCollectionToFirestore } from '@echo/firestore/crud/collection/add-collection'
import { getCollectionByContract as getCollectionByAddressFromFirestore } from '@echo/firestore/crud/collection/get-collection-by-contract'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import type { Address } from '@echo/model/types/address'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { getCollectionByContract } from '@echo/nft-scan/services/get-collection-by-contract'
import { getNftsByCollectionContract } from '@echo/nft-scan/services/get-nfts-by-collection-contract'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { CollectionSource } from '@echo/tasks/constants/collection-source'
import { error, info } from '@echo/tasks/helpers/logger'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { getNftOwner } from '@echo/web3/services/get-nft-owner'
import { andThen, assoc, isNil, otherwise, pipe } from 'ramda'

interface GetCollectionReturn {
  collection: Nullable<Collection>
  source: CollectionSource
}

/**
 * Get a collection from Firestore, and if it doesn't exist, from the API
 * @param contract
 */
async function getCollection(contract: Address): Promise<GetCollectionReturn> {
  info({ collection: { contract } }, 'getting collection')
  const collection = await getCollectionByAddressFromFirestore(contract)
  if (isNil(collection)) {
    return pipe(
      getCollectionByContract,
      andThen(({ collection, isSpam }) => {
        if (isSpam) {
          return Promise.reject(Error(CollectionError.Spam))
        }
        return { collection, source: CollectionSource.Api }
      })
    )(contract)
  }
  return { collection, source: CollectionSource.Firestore }
}

/**
 * Retrieves the collection associated with a given contract or adds it to Firestore if it does not exist already
 * @param contract
 * @throws Error returns a rejected promise if the collection is not found
 * @throws Error returns a rejected promise if the collection could not have been added to Firestore
 */
export async function getOrAddCollection(contract: Address): Promise<Collection> {
  const { collection, source } = await getCollection(contract)
  if (isNil(collection)) {
    return Promise.reject(Error(CollectionError.NotFound))
  }
  if (source === CollectionSource.Api) {
    const { data, id } = await addCollectionToFirestore(collection)
    info({ collection: assoc('id', id, data) }, 'added collection')
    // add collection NFTs
    const nfts = await getNftsByCollectionContract(contract)
    for (const nft of nfts) {
      const ownerWallet = await getNftOwner(nft)
      const owner = await pipe(getUserByWallet, andThen(unlessNil(userDocumentToModel)))(ownerWallet)
      await pipe<[PartialNft], Nft, Nft, Promise<NewDocument<Nft>>, Promise<void>>(
        assoc('collection', collection),
        assoc('owner', owner),
        addNft,
        otherwise<NewDocument<NftDocument>, void>((err) => {
          error({ nft, collection, err }, 'could not add NFT')
        })
      )(nft)
    }
    info({ collection: assoc('id', id, data) }, `added ${nfts.length} collection NFTs`)
  }
  return collection
}
