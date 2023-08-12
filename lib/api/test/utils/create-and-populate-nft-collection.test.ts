import { createAndPopulateNftCollection } from '../../src/utils/handler/create-and-populate-nft-collection'
import { mockGetNftsForContract } from '../mocks/alchemy/get-nfts-for-contract'
import { mockAddNft } from '../mocks/firestore/add-nft'
import { mockAddNftCollection } from '../mocks/firestore/add-nft-collection'
import { nftCollectionFirestoreData } from '../mocks/nft-collection-firestore-data'
import { addNft, addNftCollection, FirestoreNftCollectionPrototype } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/alchemy', () => ({
  getNftsForContract: (address: string) => mockGetNftsForContract(address)
}))
jest.mock('@echo/firestore')

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
        expect(e).toBeDefined()
      })
  })
  it('if addNftCollection returns an error, rejects', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockedAddCollection.mockResolvedValueOnce(undefined)
    createAndPopulateNftCollection({} as unknown as FirestoreNftCollectionPrototype, 'test')
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(e).toBeDefined()
      })
  })
  it('if getNftsForContract throws, rejects', () => {
    createAndPopulateNftCollection({} as unknown as FirestoreNftCollectionPrototype, 'throw')
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(e).toBeDefined()
      })
  })
  it('if getNftsForContract rejects, rejects', () => {
    createAndPopulateNftCollection({} as unknown as FirestoreNftCollectionPrototype, 'test')
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(e).toBeDefined()
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
        expect(e).toBeDefined()
      })
  })
  it('if addNft sends error, rejects', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockedAddNft.mockResolvedValueOnce(undefined)
    createAndPopulateNftCollection(
      {} as unknown as FirestoreNftCollectionPrototype,
      '0x320e2fa93A4010ba47edcdE762802374bac8d3F7'
    )
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(e).toBeDefined()
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
