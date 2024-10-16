import { nftMock } from '@echo/model/mocks/nft/nft-mock'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { isNil, pipe, prop } from 'ramda'

export function getNftMockById(id: string): OwnedNft {
  const mock = pipe(nftMock, prop(id))()
  if (isNil(mock)) {
    throw Error(`wrong nft mock id: ${id}`)
  }
  return mock
}
