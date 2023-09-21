import { discordUserDataConverter } from '@echo/firestore/converters/discord-user-data-converter'
import { discordUserSnapshotMock } from '@echo/firestore-mocks/discord-user/discord-user-snapshot-mock'
import { getDiscordUserDocumentDataMockById } from '@echo/firestore-mocks/discord-user/get-discord-user-document-data-mock-by-id'
import { getDiscordUserMockById } from '@echo/firestore-mocks/discord-user/get-discord-user-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('converters - discordUserDataConverter', () => {
  const discordUser = getDiscordUserMockById('WpgDZHmdpvHjykHRRWp7')

  it('from Firestore conversion', () => {
    const discordUserSnapshot = discordUserSnapshotMock['WpgDZHmdpvHjykHRRWp7']!
    expect(discordUserDataConverter.fromFirestore(discordUserSnapshot)).toStrictEqual(discordUser)
  })

  it('to Firestore conversion', () => {
    const discordUserDocumentData = getDiscordUserDocumentDataMockById('WpgDZHmdpvHjykHRRWp7')
    expect(discordUserDataConverter.toFirestore(discordUser)).toStrictEqual(discordUserDocumentData)
  })
})
