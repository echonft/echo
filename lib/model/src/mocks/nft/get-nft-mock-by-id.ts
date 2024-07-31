import { nftMock } from '@echo/model/mocks/nft/nft-mock'
import type { OwnedNft } from '@echo/model/types/nft'
import { isNil } from 'ramda'

export function getNftMockById(id: string): OwnedNft {
  const mock = nftMock[id]
  if (isNil(mock)) {
    throw Error(`wrong nft mock id: ${id}`)
  }
  return mock
}
