import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getAllOutdatedNfts } from '@echo/firestore/crud/nft/get-all-outdated-nfts'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { andThen, map, pipe, prop } from 'ramda'

// TODO We could add a limit for the call to avoid huge fetch
export async function deleteOutdatedNfts(before: number) {
  await pipe(getAllOutdatedNfts, andThen(pipe(map(pipe(prop('id'), deleteNft)), promiseAll)))(before)
}
