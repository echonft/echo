import { DiscordGuild } from '../../../types'
import { mockContractErc721 } from './contract'

export const mockDiscordGuild: DiscordGuild = {
  id: 'xA40abnyBq6qQHSYmtHj',
  discordId: '1',
  channelId: '1',
  name: 'Echo Test',
  contracts: [mockContractErc721]
}
