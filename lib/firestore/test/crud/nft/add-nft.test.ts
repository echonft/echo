import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { getCollectionMockBySlug } from '@echo/model/mocks/collection/get-collection-mock-by-slug'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Nft } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, dissoc, isNil, pipe } from 'ramda'

describe('CRUD - nft - addNft', () => {
  let nftId: Nullable<string>
  beforeEach(() => {
    nftId = undefined
  })
  afterEach(async () => {
    if (!isNil(nftId)) {
      await deleteReference({
        collectionReference: getNftsCollectionReference(false),
        id: nftId
      })
    }
  })
  it('addNft', async () => {
    const originalNft = pipe(nftMockSpiralJohnnyId, getNftMockById)()
    const collection = getCollectionMockBySlug(originalNft.collection.slug)
    const newDocument = await pipe<[Nft], Omit<Nft, 'tokenIdLabel'>, NftDocumentData, Promise<NewDocument<Nft>>>(
      dissoc('tokenIdLabel'),
      assoc('collection', collection),
      addNft
    )(originalNft)
    nftId = newDocument.id
    expect(newDocument.data).toStrictEqual(originalNft)
    const nft = (await getNftById(nftId))!
    expect(nft).toStrictEqual(originalNft)
  })
})
