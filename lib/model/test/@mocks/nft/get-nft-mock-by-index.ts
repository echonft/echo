import { nftEqualsIndex } from '@echo/model/helpers/nft/nft-equals-index'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { find, isNil } from 'ramda'

export function getNftMockByIndex(index: NftIndex): Nft {
  const mock = find(nftEqualsIndex(index), getAllNftMocks())
  if (isNil(mock)) {
    throw Error(`wrong nft mock index: ${JSON.stringify(index)}`)
  }
  return mock
}
