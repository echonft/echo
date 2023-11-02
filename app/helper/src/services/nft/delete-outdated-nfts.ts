import { getAllOutdatedNftReferences } from '@echo/firestore/crud/nft/get-all-outdated-nft-references'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { invoker, map, pipe } from 'ramda'

// TODO We could add a limit for the call to avoid huge fetch
export async function deleteOutdatedNfts(before: number) {
  const outdatedNftRefs = await getAllOutdatedNftReferences(before)
  await pipe(map(invoker(0, 'delete')), promiseAll)(outdatedNftRefs)
}
