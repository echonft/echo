import type { AddCollectionNftsTaskData } from '@echo/firestore-functions/tasks/add-collection-nfts-task'
import { addNftTask } from '@echo/firestore-functions/tasks/add-nft-task'
import { enqueueTask } from '@echo/firestore-functions/tasks/helpers/enqueue-task'
import { getCollectionByContract } from '@echo/firestore/crud/collection/get-collection-by-contract'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import { getNftsByCollectionContract } from '@echo/nft-scan/services/get-nfts-by-collection-contract'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, andThen, assoc, isNil, otherwise, pipe, prop } from 'ramda'

export async function addCollectionNftsRequestHandler(data: AddCollectionNftsTaskData) {
  const collection = await pipe(
    prop('contract'),
    getCollectionByContract,
    otherwise(always(undefined as Nullable<CollectionDocument>))
  )(data)
  if (!isNil(collection)) {
    const nfts = await pipe(
      prop('contract'),
      getNftsByCollectionContract,
      otherwise(always([] as PartialNft[]))
    )(collection)
    for (const nft of nfts) {
      await pipe(assoc('collection', collection), addNftTask, andThen(enqueueTask))(nft)
    }
  }
}
