import { FirestoreAccount } from '@echo/firestore/types/model/account/firestore-account'
import { TokenSet } from 'next-auth'

export function mapTokenSetToFirestoreAccount(tokens: TokenSet): Partial<FirestoreAccount> {
  return {
    token_type: tokens.token_type,
    access_token: tokens.access_token,
    expires_at: tokens.expires_at,
    refresh_token: tokens.refresh_token,
    scope: tokens.scope
  }
}
