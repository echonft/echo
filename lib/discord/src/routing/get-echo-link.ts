import { getDiscordAppEnvironment } from '../config'
import { AppEnvironment } from '../types'

export function getEchoLink() {
  return getDiscordAppEnvironment() === AppEnvironment.DEV ? 'http://localhost:3000' : 'https://echonft.xyz'
}
