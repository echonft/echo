import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getAllNftMocks } from '@echo/model/mocks/nft/get-all-nft-mocks'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { describe, expect, it } from '@jest/globals'
import { filter, pathEq, pipe } from 'ramda'

describe('CRUD - nft - getNftsForOwner', () => {
  it('returns an empty array the user is not found', async () => {
    const result = await getNftsForOwner('not-found')
    expect(result).toEqual([])
  })
  it('returns the nfts of the user', async () => {
    let nfts = await getNftsForOwner(userMockJohnnyUsername())
    expect(nfts.length).toEqual(4)
    let nftMocks = pipe(getAllNftMocks, filter(pathEq(userMockJohnnyUsername(), ['owner', 'username'])))()
    expect(eqListContent(nfts, nftMocks)).toBeTruthy()
    nfts = await getNftsForOwner(userMockCrewUsername())
    expect(nfts.length).toEqual(2)
    nftMocks = pipe(getAllNftMocks, filter(pathEq(userMockCrewUsername(), ['owner', 'username'])))()
    expect(eqListContent(nfts, nftMocks)).toBeTruthy()
  })
})
