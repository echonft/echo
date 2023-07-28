import { mockAddDiscordGuildAndContracts } from '../../src/mocks/firebase-admin/add-discord-guild-and-contracts'
import { createAndPopulateNftCollection } from '../../src/utils/handler/__mocks__/create-and-populate-nft-collection'
import * as createAndPopulate from '../../src/utils/handler/create-and-populate-nft-collection'
import { createDiscordFromRequest } from '../../src/utils/handler/create-discord-from-request'
import { CreateDiscordRequest } from '@echo/api-public'
import { addDiscordGuildAndContracts } from '@echo/firebase-admin'
import { discordGuildFirestoreData, FirestoreNftCollectionPrototype } from '@echo/firestore'
import { errorMessage } from '@echo/utils'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

jest.mock('../../src/utils/handler/fetch-contract-metadata-from-request')
jest.mock('../../src/utils/handler/create-and-populate-nft-collection')
jest.mock('@echo/firebase-admin')

describe('utils - handlers - createDiscordFromRequest', () => {
  const mockedCreateAndPopulate = jest.spyOn(createAndPopulate, 'createAndPopulateNftCollection')
  const mockedAddDiscordAndContract = jest
    .mocked(addDiscordGuildAndContracts)
    .mockImplementation(mockAddDiscordGuildAndContracts)
  const mockRequest: CreateDiscordRequest = {
    channelId: '1',
    discordId: '1',
    name: 'test',
    contracts: [{ address: '0xe785E82358879F061BC3dcAC6f0444462D4b5330', chainId: 1 }]
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if fetchContractMetadataFromRequest rejects, rejects', () => {
    createDiscordFromRequest({ ...mockRequest, contracts: [{ address: 'test', chainId: 1 }] })
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('fetchContractMetadataFromRequest error')
      })
  })
  it('if fetchContractMetadataFromRequest throws, rejects', () => {
    createDiscordFromRequest({ ...mockRequest, contracts: [{ address: 'throw', chainId: 1 }] })
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('Error')
      })
  })
  it('if addDiscordGuildAndContracts throws, rejects', () => {
    mockedAddDiscordAndContract.mockRejectedValueOnce(new Error('addDiscordGuildAndContracts throws'))
    createDiscordFromRequest(mockRequest)
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('addDiscordGuildAndContracts throws')
      })
  })
  it('if addDiscordGuildAndContracts returns error, rejects', () => {
    mockedAddDiscordAndContract.mockResolvedValueOnce(R.fromNullable(undefined, new Error()))
    createDiscordFromRequest(mockRequest)
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('createDiscordFromRequest Error adding Discord Guild and Contracts')
      })
  })
  it('if createAndPopulateNftCollection rejects, rejects', () => {
    mockedCreateAndPopulate.mockImplementationOnce(() =>
      createAndPopulateNftCollection({} as FirestoreNftCollectionPrototype, 'test')
    )
    createDiscordFromRequest(mockRequest)
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('createAndPopulateNftCollection error')
      })
  })
  it('if createAndPopulateNftCollection returns, returns proper value', () => {
    const expected = discordGuildFirestoreData['ncUnbpFfVCofV9bD7ctn']
    mockedCreateAndPopulate.mockImplementationOnce(() =>
      createAndPopulateNftCollection({} as FirestoreNftCollectionPrototype, 'Rc8pLQXxgyQGIRL0fr13')
    )
    createDiscordFromRequest(mockRequest)
      .then((result) => {
        expect(result).toBe(expected)
      })
      .catch(() => {
        expect(true).toBeFalsy()
      })
  })
})
