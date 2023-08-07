import { createDiscordGuildHandler } from '../../src/handlers/discord-guild/create-discord-guild-handler'
import { mockGetNftsForContract } from '../../src/mocks/alchemy/get-nfts-for-contract'
import { createDiscordFromRequest } from '../../src/utils/handler/create-discord-from-request'
import { CreateDiscordRequest, DiscordGuildResponse, mockRequestResponse } from '@echo/api-public'
import { findContractsByAddresses } from '@echo/firebase-admin'
import { contractFirestoreData, discordGuildFirestoreData } from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

jest.mock('@echo/firebase-admin')
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
  const mockedFindContractsByAddresses = jest
    .mocked(findContractsByAddresses)
    .mockResolvedValue(R.fromNullable(undefined, Error('should not happen')))
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

  it('if findContractsByAddresses fails, returns 400', async () => {
    mockedFindContractsByAddresses.mockRejectedValueOnce(Error('test'))
    const { req, res } = mockRequestResponse<CreateDiscordRequest, never, DiscordGuildResponse>(
      'PUT',
      undefined,
      mockedCreateDiscordRequest
    )
    await createDiscordGuildHandler(req, res, undefined)
    expect(res.statusCode).toBe(400)
    expect(res._getJSONData()).toEqual({ error: 'Invalid body' })
  })

  it('if findContractsByAddresses returns a value, returns 400', async () => {
    mockedFindContractsByAddresses.mockResolvedValueOnce(
      R.fromNullable([contractFirestoreData['hK2XrmnMpCVneRH7Mbo6']!], Error('should not happen'))
    )
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
    mockedCreateDiscordFromRequest.mockRejectedValueOnce(Error('test'))
    const { req, res } = mockRequestResponse<CreateDiscordRequest, never, DiscordGuildResponse>('PUT', undefined, {
      ...mockedCreateDiscordRequest
    })
    await createDiscordGuildHandler(req, res, undefined)
    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Error creating Discord Guild' })
  })

  it('if createDiscordFromRequest succeed, returns 200', async () => {
    mockedFindContractsByAddresses.mockResolvedValue(R.fromNullable(undefined, Error('should not happen')))
    const { req, res } = mockRequestResponse<CreateDiscordRequest, never, DiscordGuildResponse>('PUT', undefined, {
      ...mockedCreateDiscordRequest
    })
    await createDiscordGuildHandler(req, res, undefined)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual(mockedDiscord)
  })
})
