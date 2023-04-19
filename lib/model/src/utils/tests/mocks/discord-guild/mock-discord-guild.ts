import { DiscordGuild } from '../../../../types/discord-guild'
import { mockContractErc721 } from '../contract/mock-contract-erc721'

export const mockDiscordGuild: DiscordGuild = {
  id: 'xA40abnyBq6qQHSYmtHj',
  discordId: '1',
  channelId: '1',
  name: 'Echo Test',
  contracts: [mockContractErc721]
}
