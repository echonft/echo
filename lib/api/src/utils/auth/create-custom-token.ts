import { auth } from '@echo/firebase-admin'

export function createCustomToken(discordId: string): Promise<string> {
  return auth().createCustomToken(discordId)
}
