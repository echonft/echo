import { nftMock } from '@echo/model-mocks/nft/nft-mock'
import { isNil } from 'ramda'

export function getNftMockById(id: string) {
  const mock = nftMock[id]
  if (isNil(mock)) {
    throw Error(`wrong nft mock id: ${id}`)
  }
  return mock
}
