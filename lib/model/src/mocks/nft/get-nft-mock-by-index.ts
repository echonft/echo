import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { getAllNftMocks } from '@echo/model/mocks/nft/get-all-nft-mocks'
import type { NftIndex } from '@echo/model/types/nft/nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { equals, find, isNil, pipe } from 'ramda'

export function getNftMockByIndex(index: NftIndex): OwnedNft {
  const mock = find(pipe(nftIndex, equals(index)), getAllNftMocks())
  if (isNil(mock)) {
    throw Error(`wrong nft mock index`)
  }
  return mock
}
