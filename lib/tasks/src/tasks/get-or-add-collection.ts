import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { addCollection as addCollectionToFirestore } from '@echo/firestore/crud/collection/add-collection'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import type { NewDocument } from '@echo/firestore/types/new-document'
import type { Collection } from '@echo/model/types/collection'
import type { Contract } from '@echo/model/types/contract'
import type { Nft } from '@echo/model/types/nft'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { error, info } from '@echo/tasks/helpers/logger'
import { fetchNftsByContract } from '@echo/tasks/tasks/fetch-nfts-by-contract'
import { getCollection } from '@echo/tasks/tasks/get-collection'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { getNftOwner } from '@echo/web3/services/get-nft-owner'
import { andThen, assoc, isNil, otherwise, pipe } from 'ramda'

/**
 * Retrieves the collection associated with a given contract or adds it to Firestore if it does not exist already
 * @param contract
 * @throws Error returns a rejected promise if the collection is not found
 * @throws Error returns a rejected promise if the collection could not have been added to Firestore
 */
export async function getOrAddCollection(contract: Contract): Promise<Collection> {
  const { collection, source } = await getCollection(contract)
  if (isNil(collection)) {
    return Promise.reject(Error('collection not found'))
  }
  if (source === 'api') {
    const { data, id } = await addCollectionToFirestore(collection)
    info({ collection: assoc('id', id, data) }, 'added collection')
    // add collection NFTs
    const nfts = await fetchNftsByContract(contract)
    for (const nft of nfts) {
      const ownerWallet = await getNftOwner(nft)
      const owner = await pipe(
        getUserByWallet,
        andThen(unlessNil(pipe(userDocumentToModel, assoc('wallet', ownerWallet.address))))
      )(ownerWallet)
      await pipe<[PartialNft], Nft, Nft, Promise<NewDocument<Nft>>, Promise<NewDocument<Nft>>>(
        assoc('collection', collection),
        assoc('owner', owner),
        addNft,
        otherwise((err) => {
          error({ nft, collection, err }, 'could not add NFT')
        })
      )(nft)
    }
    info({ collection: assoc('id', id, data) }, `added ${nfts.length} collection NFTs`)
  }
  return collection
}
