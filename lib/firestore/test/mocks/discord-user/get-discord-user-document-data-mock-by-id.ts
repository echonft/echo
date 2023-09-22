import { discordUserDocumentDataMock } from '@echo/firestore-mocks/discord-user/discord-user-document-data-mock'

export function getDiscordUserDocumentDataMockById(id: string) {
  return discordUserDocumentDataMock[id]!
}
