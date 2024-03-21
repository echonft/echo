export interface SwapPostDiscordGuild {
  channelId: string
  discordId: string
}

export interface SwapPost {
  id: string
  swapId: string
  guild: SwapPostDiscordGuild
  postedAt: number
}
