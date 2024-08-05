import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { assertNfts } from '@echo/firestore/utils/nft/assert-nfts'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Nft } from '@echo/model/types/nft'
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
      await deleteReference({
        collectionReference: getNftsCollectionReference(),
        id: nftId
      })
    }
  })
  it('addNft', async () => {
    const originalNft = omit(['updatedAt'], getNftMockById(nftMockSpiralJohnnyId()))
    const newDocument = await addNft(originalNft)
    nftId = newDocument.id
    expect(
      pipe<[NewDocument<Nft>], Nft, Omit<Nft, 'updatedAt'>>(prop('data'), omit(['updatedAt']))(newDocument)
    ).toStrictEqual(originalNft)
    const nft = (await getNftById(nftId))!
    expect(omit(['updatedAt'], nft)).toStrictEqual(originalNft)
  })
})
