import type { Nft } from '@echo/model/types/nft'
import { getNftName } from '@echo/ui/helpers/nft/get-nft-name'
import { describe, expect, test } from '@jest/globals'

describe('helpers - nft - getNftName', () => {
  test('returns the right name if it exists', () => {
    const nft1: Nft = {
      id: 'id',
      name: 'name',
      tokenId: 1
    } as unknown as Nft
    expect(getNftName(nft1)).toEqual(nft1.name)
  })
  test('returns the collection name + token id if nft has no name', () => {
    const nft1: Nft = {
      id: 'id',
      name: '',
      tokenId: 1,
      collection: {
        name: 'test'
      }
    } as unknown as Nft
    expect(getNftName(nft1)).toEqual('test #1')

    const nft2: Nft = {
      id: 'id',
      name: undefined,
      tokenId: 1,
      collection: {
        name: 'test'
      }
    } as unknown as Nft
    expect(getNftName(nft2)).toEqual('test #1')

    const nft3: Nft = {
      id: 'id',
      name: undefined,
      tokenId: 1,
      collection: {
        name: ''
      }
    } as unknown as Nft
    expect(getNftName(nft3)).toEqual(' #1')
  })
})
