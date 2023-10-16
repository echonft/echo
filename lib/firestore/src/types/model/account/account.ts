export interface Account {
  access_token: string
  expires_at: number
  provider: string
  providerAccountId: string
  refresh_token: string
  scope: string
  token_type?: string
  type: string
  userId: string
}
