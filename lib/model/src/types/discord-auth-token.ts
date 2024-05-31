export interface DiscordAuthToken {
  tokenType: string
  accessToken: string
  expiresIn: number
  refreshToken: string
  scope: string
  expiresAt: number
}
