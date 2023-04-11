import { auth } from '@echo/firebase-admin'

// TODO Add additional claims for access control
export function createCustomToken(discordId: string): Promise<string> {
  return auth().createCustomToken(discordId)
}
