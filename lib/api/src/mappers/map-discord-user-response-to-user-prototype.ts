import { DiscordUserResponse } from '@echo/discord'
import { FirestoreUserPrototype } from '@echo/firestore'
import { join, map, prop } from 'ramda'

export function mapDiscordUserResponseToUserPrototype(response: DiscordUserResponse): FirestoreUserPrototype {
  return {
    discordId: response.id,
    discordUsername: join('#', [response.username, response.discriminator]),
    discordAvatar: response.avatar,
    discordBanner: response.banner,
    discordGuildIds: map(prop('id'))(response.guilds ?? [])
  }
}
