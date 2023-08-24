import { addNft } from '../../../src/crud/nft/add-nft'
import { deleteNft } from '../../../src/crud/nft/delete-nft'
import { findNftById } from '../../../src/crud/nft/find-nft-by-id'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { nftMock } from '../../mocks/nft-mock'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('CRUD - nft - addNft', () => {
  let id: string
  beforeAll(initialize)
  afterAll(terminate)
  afterEach(async () => {
    try {
      await deleteNft(id)
    } catch (_err) {
      // collection was never created, test must have failed
    }
  })

  it('addNft', async () => {
    const originalNft = omit(['id'], nftMock['8hHFadIrrooORfTOLkBg']!)
    id = await addNft(originalNft)
    const nft = await findNftById(id)
    expect(omit(['id'], nft)).toStrictEqual(originalNft)
  })
})
