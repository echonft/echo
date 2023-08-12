import { createDiscordGuildHandler } from '../../src/handlers/discord-guild/create-discord-guild-handler'
import { createDiscordFromRequest } from '../../src/utils/handler/create-discord-from-request'
import { mockGetNftsForContract } from '../mocks/alchemy/get-nfts-for-contract'
import { contractFirestoreData } from '../mocks/contract-firestore-data'
import { discordGuildFirestoreData } from '../mocks/discord-guild-firestore-data'
import { mockRequestResponse } from '../mocks/request-response'
import { CreateDiscordRequest, DiscordGuildResponse } from '@echo/api-public'
import { findContractsByAddresses } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firestore')
jest.mock('../../src/utils/handler/create-discord-from-request')
jest.mock('@echo/alchemy', () => ({
  getNftsForContract: (address: string) => mockGetNftsForContract(address)
}))

describe('handlers - discord-guild - createDiscordGuildHandler', () => {
  const mockedCreateDiscordRequest: CreateDiscordRequest = {
    discordId: 1,
    channelId: 1,
    name: 'test',
    contracts: [{ address: '0x12c63bbD266dB84e117356e664f3604055166CEc', chainId: 1 }]
  }
  const mockedDiscord = discordGuildFirestoreData['Y8GBFtPZKElp44z0k10D']!
  const mockedFindContractsByAddresses = jest.mocked(findContractsByAddresses).mockRejectedValue(new Error('test'))
  const mockedCreateDiscordFromRequest = jest.mocked(createDiscordFromRequest).mockResolvedValue(mockedDiscord)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if invalid request, returns 400', async () => {
    const { req, res } = mockRequestResponse<CreateDiscordRequest, never, DiscordGuildResponse>('PUT')
    await createDiscordGuildHandler(req, res, undefined)
    expect(res.statusCode).toBe(400)
    expect(res._getJSONData()).toEqual({ error: 'Invalid body' })
  })

  it('if findContractsByAddresses returns a value, returns 400', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockedFindContractsByAddresses.mockResolvedValueOnce(contractFirestoreData['hK2XrmnMpCVneRH7Mbo6'])
    const { req, res } = mockRequestResponse<CreateDiscordRequest, never, DiscordGuildResponse>(
      'PUT',
      undefined,
      mockedCreateDiscordRequest
    )
    await createDiscordGuildHandler(req, res, undefined)
    expect(res.statusCode).toBe(400)
    expect(res._getJSONData()).toEqual({ error: 'Contracts already in database' })
  })

  it('if createDiscordFromRequest fails, returns 500', async () => {
    mockedCreateDiscordFromRequest.mockRejectedValueOnce(new Error('test'))
    const { req, res } = mockRequestResponse<CreateDiscordRequest, never, DiscordGuildResponse>('PUT', undefined, {
      ...mockedCreateDiscordRequest
    })
    await createDiscordGuildHandler(req, res, undefined)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Error creating Discord Guild' })
  })

  it('if createDiscordFromRequest succeed, returns 200', async () => {
    const { req, res } = mockRequestResponse<CreateDiscordRequest, never, DiscordGuildResponse>('PUT', undefined, {
      ...mockedCreateDiscordRequest
    })
    await createDiscordGuildHandler(req, res, undefined)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual(mockedDiscord)
  })
})
