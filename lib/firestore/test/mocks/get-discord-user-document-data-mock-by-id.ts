import { discordUserDocumentDataMock } from '@echo/firestore-mocks/discord-user-document-data-mock'

export const getDiscordUserDocumentDataMockById = (id: string) => discordUserDocumentDataMock[id]!
