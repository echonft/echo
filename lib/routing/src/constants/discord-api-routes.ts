import { DiscordApiRoute } from '@echo/routing/services/discord/discord-api-route'

export const discordApiRoutes = {
  auth: {
    getToken: new DiscordApiRoute('/oauth2/token'),
    revoke: new DiscordApiRoute('/oauth2/token/revoke')
  },
  user: {
    me: new DiscordApiRoute('/users/@me')
  }
}
