import { getAllNftCollections } from './get-all-nft-collections'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, map, path, pipe } from 'ramda'

export const getAllNftCollectionsAddresses = pipe(
  getAllNftCollections,
  andThen(R.map(map(path(['contract', 'address'])))),
  castAs<Promise<string[]>>
)
