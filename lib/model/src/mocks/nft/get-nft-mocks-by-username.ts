import { getAllNftMocks } from '@echo/model/mocks/nft/get-all-nft-mocks'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { filter, type NonEmptyArray, pathEq, pipe } from 'ramda'

export function getNftMocksByUsername(username: string): NonEmptyArray<OwnedNft> {
  return pipe(getAllNftMocks, filter(pathEq(username, ['owner', 'username'])))()
}
