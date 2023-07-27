import { createAndPopulateNftCollection } from '../../src/utils/handler/create-and-populate-nft-collection'
import { mockGetNftsForContract } from '../../src/utils/test/mocks/alchemy/get-nfts-for-contract'
import { mockAddNft } from '../../src/utils/test/mocks/firebase-admin/add-nft'
import { mockAddNftCollection } from '../../src/utils/test/mocks/firebase-admin/add-nft-collection'
import { addNft, addNftCollection } from '@echo/firebase-admin'
import { FirestoreNftCollectionPrototype, nftCollectionFirestoreData } from '@echo/firestore'
import { errorMessage } from '@echo/utils'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

jest.mock('@echo/alchemy', () => ({
  getNftsForContract: (address: string) => mockGetNftsForContract(address)
}))
jest.mock('@echo/firebase-admin')

describe('utils - handlers - createAndPopulateNftCollection', () => {
  const mockedAddNft = jest.mocked(addNft).mockImplementation(mockAddNft)
  const mockedAddCollection = jest.mocked(addNftCollection).mockImplementation(mockAddNftCollection)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if addNftCollection rejects, rejects', () => {
    mockedAddCollection.mockRejectedValueOnce(new Error('test'))
    createAndPopulateNftCollection({} as unknown as FirestoreNftCollectionPrototype, 'test')
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('test')
      })
  })
  it('if addNftCollection returns an error, rejects', () => {
    mockedAddCollection.mockResolvedValueOnce(R.fromNullable(undefined, new Error('test')))
    createAndPopulateNftCollection({} as unknown as FirestoreNftCollectionPrototype, 'test')
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('createAndPopulateNftCollection Error adding NFT Collection')
      })
  })
  it('if getNftsForContract throws, rejects', () => {
    createAndPopulateNftCollection({} as unknown as FirestoreNftCollectionPrototype, 'throw')
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('Error')
      })
  })
  it('if getNftsForContract rejects, rejects', () => {
    createAndPopulateNftCollection({} as unknown as FirestoreNftCollectionPrototype, 'test')
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('createAndPopulateNftCollection Error fetching NFTs')
      })
  })
  it('if addNft rejects, rejects', () => {
    mockedAddNft.mockRejectedValueOnce(new Error('test'))
    createAndPopulateNftCollection(
      {} as unknown as FirestoreNftCollectionPrototype,
      '0x320e2fa93A4010ba47edcdE762802374bac8d3F7'
    )
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('test')
      })
  })
  it('if addNft sends error, rejects', () => {
    mockedAddNft.mockResolvedValueOnce(R.fromNullable(undefined, new Error('addNFT rejects')))
    createAndPopulateNftCollection(
      {} as unknown as FirestoreNftCollectionPrototype,
      '0x320e2fa93A4010ba47edcdE762802374bac8d3F7'
    )
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('createAndPopulateNftCollection Error adding NFTs')
      })
  })
  it('if success, returns the collection', () => {
    const expected = nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13']
    createAndPopulateNftCollection(
      {} as unknown as FirestoreNftCollectionPrototype,
      '0x320e2fa93A4010ba47edcdE762802374bac8d3F7'
    )
      .then((collection) => {
        expect(collection).toBe(expected)
      })
      .catch(() => {
        expect(true).toBeFalsy()
      })
  })
})
