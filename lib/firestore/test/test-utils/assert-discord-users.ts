import { getAllDiscordUsers } from '@echo/firestore/crud/discord-user/get-all-discord-users'
import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import { getAllDiscordUserMocks } from '@echo/firestore-mocks/get-all-discord-user-mocks'
import { getDiscordUserMockById } from '@echo/firestore-mocks/get-discord-user-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertDiscordUsers() {
  const discordUserMocks = getAllDiscordUserMocks()
  const discordUsers = await getAllDiscordUsers()
  expect(discordUsers.length).toEqual(discordUserMocks.length)
  forEach((discordUser: FirestoreDiscordUser) => {
    expect(getDiscordUserMockById(discordUser.id)).toStrictEqual(discordUser)
  }, discordUsers)
}
