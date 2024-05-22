import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { assertNfts } from '@echo/firestore-test/nft/assert-nfts'
import type { Nft } from '@echo/model/types/nft'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil, omit, pipe, prop } from 'ramda'

describe('CRUD - nft - addNft', () => {
  let nftId: Nullable<string>
  beforeAll(async () => {
    await assertNfts()
  })
  afterAll(async () => {
    await assertNfts()
  })
  beforeEach(() => {
    nftId = undefined
  })
  afterEach(async () => {
    if (!isNil(nftId)) {
      try {
        await deleteNft(nftId)
      } catch (err) {
        throw Error(`error deleting nft ${nftId}: ${errorMessage(err)}`)
      }
    }
  })
  it('addNft', async () => {
    const originalNft = omit(['updatedAt'], getNftMockById('8hHFadIrrooORfTOLkBg'))
    const newDocument = await addNft(originalNft)
    nftId = newDocument.id
    expect(
      pipe<[NewDocument<Nft>], Nft, Omit<Nft, 'updatedAt'>>(prop('data'), omit(['updatedAt']))(newDocument)
    ).toStrictEqual(originalNft)
    const nft = (await getNftById(nftId))!
    expect(omit(['updatedAt'], nft)).toStrictEqual(originalNft)
  })
})
