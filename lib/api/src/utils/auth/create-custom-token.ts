import { auth } from '@echo/firestore'

export function createCustomToken(discordId: string): Promise<string> {
  return auth().createCustomToken(discordId)
}
