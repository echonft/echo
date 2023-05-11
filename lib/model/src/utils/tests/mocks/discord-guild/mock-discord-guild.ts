import { DiscordGuild } from '../../../../types/discord-guild'
import { mockContract } from '../contract/mock-contract'

export const mockDiscordGuild: DiscordGuild = {
  id: 'xA40abnyBq6qQHSYmtHj',
  discordId: '1',
  channelId: '1',
  name: 'Echo Test',
  contracts: [mockContract]
}
