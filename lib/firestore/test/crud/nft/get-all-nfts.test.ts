import { getAllNfts } from '../../../src/crud/nft/get-all-nfts'
import { getAllNftMocks } from '../../mocks/get-all-nft-mocks'
import { getNftMockById } from '../../mocks/get-nft-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { Nft } from '@echo/firestore-types'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('CRUD - nft - getAllNfts', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('get all nfts', async () => {
    const nftMocks = getAllNftMocks()
    const nfts = await getAllNfts()
    expect(nfts.length).toEqual(nftMocks.length)
    forEach((nft: Nft) => {
      expect(getNftMockById(nft.id)).toStrictEqual(nft)
    }, nfts)
  })
})
