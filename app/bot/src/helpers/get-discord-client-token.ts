import { isEmpty, isNil } from 'ramda'

export function getDiscordClientToken() {
  const clientToken = process.env.DISCORD_CLIENT_TOKEN
  if (isNil(clientToken) || isEmpty(clientToken)) {
    throw new Error('DISCORD_CLIENT_TOKEN env var is not defined')
  }
  return clientToken
}
