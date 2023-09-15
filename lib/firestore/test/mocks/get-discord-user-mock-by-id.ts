import { discordUserMock } from '@echo/firestore-mocks/discord-user-mock'

export const getDiscordUserMockById = (id: string) => discordUserMock[id]!
