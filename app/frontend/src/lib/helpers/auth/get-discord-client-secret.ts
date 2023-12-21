import { isEmpty, isNil } from 'ramda'

export function getDiscordClientSecret() {
  const clientSecret = process.env.DISCORD_CLIENT_SECRET
  if (isNil(clientSecret) || isEmpty(clientSecret)) {
    throw new Error('.env should contain DISCORD_CLIENT_SECRET')
  }
  return clientSecret
}
