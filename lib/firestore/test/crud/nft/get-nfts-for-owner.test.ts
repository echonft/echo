import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { nftDocumentMocks } from '@echo/test/firestore/initialize-db'
import { eqList } from '@echo/utils/helpers/eq-list'
import { describe, expect, it } from '@jest/globals'
import { filter, pathEq } from 'ramda'

describe('CRUD - nft - getNftsForOwner', () => {
  it('returns an empty array the user is not found', async () => {
    const result = await getNftsForOwner('not-found')
    expect(result).toEqual([])
  })
  it('returns the nfts of the user', async () => {
    let nfts = await getNftsForOwner(userMockJohnny.username)
    expect(nfts.length).toEqual(4)
    let nftMocks = filter(pathEq(userMockJohnny.username, ['owner', 'username']), nftDocumentMocks)
    expect(eqList(nfts, nftMocks)).toBeTruthy()
    nfts = await getNftsForOwner(userMockCrew.username)
    expect(nfts.length).toEqual(2)
    nftMocks = filter(pathEq(userMockCrew.username, ['owner', 'username']), nftDocumentMocks)
    expect(eqList(nfts, nftMocks)).toBeTruthy()
  })
})
