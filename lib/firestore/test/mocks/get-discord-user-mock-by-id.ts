import { discordUserMock } from '@echo/firestore-mocks/discord-user-mock'

export function getDiscordUserMockById(id: string) {
  return discordUserMock[id]!
}
