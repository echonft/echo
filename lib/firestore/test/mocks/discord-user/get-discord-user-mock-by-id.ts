import { discordUserMock } from '@echo/firestore-mocks/discord-user/discord-user-mock'

export function getDiscordUserMockById(id: string) {
  return discordUserMock[id]!
}
