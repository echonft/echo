import { enqueueTask } from '@echo/firestore-functions/helpers/enqueue-task'
import { addNftTask } from '@echo/firestore-functions/tasks/add-nft-task'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import { getNftsByCollectionContract } from '@echo/nft-scan/services/get-nfts-by-collection-contract'
import { promiseAll } from '@echo/utils/helpers/promise-all'
import { andThen, assoc, map, pipe, prop } from 'ramda'

export async function addCollectionNfts(collection: CollectionDocument) {
  await pipe(
    prop('contract'),
    getNftsByCollectionContract,
    andThen(pipe(map(pipe(assoc('collection', collection), addNftTask, andThen(enqueueTask))), promiseAll))
  )(collection)
}
