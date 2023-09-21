import { deleteDiscordUser } from '@echo/firestore/crud/discord-user/delete-discord-user'
import { getAllDiscordUsers } from '@echo/firestore/crud/discord-user/get-all-discord-users'

export async function clearDiscordUsers() {
  const discordUsers = await getAllDiscordUsers()
  for (const discordUser of discordUsers) {
    try {
      await deleteDiscordUser(discordUser.id)
    } catch (e) {
      // nothing to do
    }
  }
}
