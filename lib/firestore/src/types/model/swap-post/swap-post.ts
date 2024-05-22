export interface SwapPostDiscordGuild {
  channelId: string
  id: string
}

export interface SwapPost {
  swapId: string
  guild: SwapPostDiscordGuild
  postedAt: number
}
