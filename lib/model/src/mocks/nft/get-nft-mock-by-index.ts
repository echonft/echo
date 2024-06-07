import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { getAllNftMocks } from '@echo/model/mocks/nft/get-all-nft-mocks'
import { equals, find, isNil, pipe } from 'ramda'

export function getNftMockByIndex(index: NftIndex): Nft {
  const mock = find(pipe(getNftIndex, equals(index)), getAllNftMocks())
  if (isNil(mock)) {
    throw Error(`wrong nft mock index: ${JSON.stringify(index)}`)
  }
  return mock
}
