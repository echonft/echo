import { nftIndexMock } from '@echo/model-mocks/nft/nft-index-mock'
import { isNil } from 'ramda'

export function getNftIndexMockById(id: string) {
  const mock = nftIndexMock[id]
  if (isNil(mock)) {
    throw Error(`wrong nft index mock id: ${id}`)
  }
  return mock
}
