import { userDiscordGuildMock } from '@echo/firestore-mocks/user-discord-guild-mock'

export function getUserDiscordGuildMockById(id: string) {
  return userDiscordGuildMock[id]!
}
