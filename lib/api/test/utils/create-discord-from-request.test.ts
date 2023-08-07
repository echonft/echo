import { mockAddDiscordGuildAndContracts } from '../../src/mocks/firebase-admin/add-discord-guild-and-contracts'
import { createDiscordSchema } from '../../src/types/validators/create-discord'
import { createAndPopulateNftCollection } from '../../src/utils/handler/__mocks__/create-and-populate-nft-collection'
import * as createAndPopulate from '../../src/utils/handler/create-and-populate-nft-collection'
import { createDiscordFromRequest } from '../../src/utils/handler/create-discord-from-request'
import { addDiscordGuildAndContracts } from '@echo/firebase-admin'
import { discordGuildFirestoreData, FirestoreNftCollectionPrototype } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { z } from 'zod'

jest.mock('../../src/utils/handler/fetch-contract-metadata-from-request')
jest.mock('../../src/utils/handler/create-and-populate-nft-collection')
jest.mock('@echo/firebase-admin')

describe('utils - handlers - createDiscordFromRequest', () => {
  const mockedCreateAndPopulate = jest.spyOn(createAndPopulate, 'createAndPopulateNftCollection')
  const mockedAddDiscordAndContract = jest
    .mocked(addDiscordGuildAndContracts)
    .mockImplementation(mockAddDiscordGuildAndContracts)
  const mockRequest: z.infer<typeof createDiscordSchema> = {
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
        expect(e).toBeDefined()
      })
  })
  it('if fetchContractMetadataFromRequest throws, rejects', () => {
    createDiscordFromRequest({ ...mockRequest, contracts: [{ address: 'throw', chainId: 1 }] })
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(e).toBeDefined()
      })
  })
  it('if addDiscordGuildAndContracts throws, rejects', () => {
    mockedAddDiscordAndContract.mockRejectedValueOnce(new Error('addDiscordGuildAndContracts throws'))
    createDiscordFromRequest(mockRequest)
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(e).toBeDefined()
      })
  })
  it('if addDiscordGuildAndContracts returns error, rejects', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockedAddDiscordAndContract.mockResolvedValueOnce(undefined)
    createDiscordFromRequest(mockRequest)
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(e).toBeDefined()
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
        expect(e).toBeDefined()
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
