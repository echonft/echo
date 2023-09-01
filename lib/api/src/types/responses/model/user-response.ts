export interface UserResponse {
  id: string
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
  wallet: {
    chainId: number
    address: string
  }
}
