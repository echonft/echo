import { isEmpty, isNil } from 'ramda'

export function getDiscordClientId() {
  const clientId = process.env.DISCORD_CLIENT_ID
  if (isNil(clientId) || isEmpty(clientId)) {
    throw new Error('.env should contain DISCORD_CLIENT_ID')
  }
  return clientId
}
