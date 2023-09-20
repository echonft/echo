import { userDiscordGuildDataConverter } from '@echo/firestore/converters/user-discord-guild-data-converter'
import { getUserDiscordGuildDocumentDataMockById } from '@echo/firestore-mocks/get-user-discord-guild-document-data-mock-by-id'
import { getUserDiscordGuildMockById } from '@echo/firestore-mocks/get-user-discord-guild-mock-by-id'
import { userDiscordGuildSnapshotMock } from '@echo/firestore-mocks/user-discord-guild-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - userDataConverter', () => {
  const userDiscordGuilds = getUserDiscordGuildMockById('3gWDBihHVUQLJxbiJOIp')

  it('from Firestore conversion', () => {
    const userDiscordGuildsSnapshot = userDiscordGuildSnapshotMock['3gWDBihHVUQLJxbiJOIp']!
    expect(userDiscordGuildDataConverter.fromFirestore(userDiscordGuildsSnapshot)).toStrictEqual(userDiscordGuilds)
  })

  it('to Firestore conversion', () => {
    const userDiscordGuildsDocumentData = getUserDiscordGuildDocumentDataMockById('3gWDBihHVUQLJxbiJOIp')
    expect(userDiscordGuildDataConverter.toFirestore(userDiscordGuilds)).toStrictEqual(userDiscordGuildsDocumentData)
  })
})
