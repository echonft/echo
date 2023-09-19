import { userDiscordGuildDocumentDataMock } from '@echo/firestore-mocks/user-discord-guild-document-data-mock'

export function getUserDiscordGuildDocumentDataMockById(id: string) {
  return userDiscordGuildDocumentDataMock[id]!
}
