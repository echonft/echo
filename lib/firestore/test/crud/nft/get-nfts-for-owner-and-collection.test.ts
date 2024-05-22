import { getNftsForOwnerAndCollection } from '@echo/firestore/crud/nft/get-nfts-for-owner-and-collection'
import { mapNftToNftIndex } from '@echo/model/helpers/nft/map-nft-to-nft-index'
import type { Nft } from '@echo/model/types/nft'
import { getNftMockByIndex } from '@echo/model-mocks/nft/get-nft-mock-by-index'
import { describe, expect, it } from '@jest/globals'
import { andThen, pipe } from 'ramda'

describe('CRUD - nft - getNftsForOwnerAndCollection', () => {
  function expectNftsLength(nfts: Nft[], length: number) {
    expect(nfts.length).toEqual(length)
  }

  function expectNftsEqualMock(nfts: Nft[]) {
    for (const nft of nfts) {
      expect(nft).toStrictEqual(getNftMockByIndex(mapNftToNftIndex(nft)))
    }
  }

  function expectNfts(length: number) {
    return function (nfts: Nft[]) {
      expectNftsLength(nfts, length)
      expectNftsEqualMock(nfts)
    }
  }

  it('returns an empty array the user is not found', async () => {
    const result = await getNftsForOwnerAndCollection('not-found', 'pxmythics-genesis')
    expect(result).toEqual([])
  })
  it('returns an empty array the collection is not found', async () => {
    const result = await getNftsForOwnerAndCollection('johnnycagewins', 'not-found')
    expect(result).toEqual([])
  })
  it('returns the nfts of the user and the collection', async () => {
    await pipe(getNftsForOwnerAndCollection, andThen(expectNfts(2)))('johnnycagewins', 'pxmythics-genesis')
    await pipe(getNftsForOwnerAndCollection, andThen(expectNfts(1)))('crewnft_', 'pxmythics-genesis')
    await pipe(getNftsForOwnerAndCollection, andThen(expectNfts(2)))('johnnycagewins', 'spiral-frequencies')
    await pipe(getNftsForOwnerAndCollection, andThen(expectNfts(1)))('crewnft_', 'spiral-frequencies')
  })
})
