import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil, pipe } from 'ramda'

describe('CRUD - nft - addNft', () => {
  let nftId: Nullable<string>
  beforeEach(() => {
    nftId = undefined
  })
  afterEach(async () => {
    if (!isNil(nftId)) {
      await deleteReference({
        collectionReference: getNftsCollectionReference(),
        id: nftId
      })
    }
  })
  it('addNft', async () => {
    const originalNft = pipe(nftMockSpiralJohnnyId, getNftMockById)()
    const newDocument = await addNft(originalNft)
    nftId = newDocument.id
    expect(newDocument.data).toStrictEqual(originalNft)
    const nft = (await getNftById(nftId))!
    expect(nft).toStrictEqual(originalNft)
  })
})
