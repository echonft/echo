import { getDiscordAppEnvironment } from '../../config'
import { AppEnvironment } from '../config'

export enum Routes {
  TOKEN = 'https://discord.com/api/v10/oauth2/token',
  USER = 'https://discord.com/api/users/@me',
  CREATE_OFFER = '/create'
}

export function getEchoLink() {
  return getDiscordAppEnvironment() === AppEnvironment.DEV ? 'http://localhost:3000' : 'https://echonft.xyz'
}
