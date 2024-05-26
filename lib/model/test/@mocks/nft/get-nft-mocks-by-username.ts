import type { Nft } from '@echo/model/types/nft'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { filter, pathEq, pipe } from 'ramda'

export function getNftMocksByUsername(username: string): Nft[] {
  return pipe(getAllNftMocks, filter(pathEq(username, ['owner', 'username'])))()
}
