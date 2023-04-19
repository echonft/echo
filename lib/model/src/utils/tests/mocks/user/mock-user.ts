import { User } from '../../../../types/user'
import { mockDiscordGuild } from '../discord-guild/mock-discord-guild'
import { mockWallet } from './mock-wallet'

export const mockUser: User = {
  id: 'oE6yUEQBPn7PZ89yMjKn',
  discordId: '123456',
  discordUsername: 'johnnycage#0890',
  discordGuilds: [mockDiscordGuild],
  discordAvatar: '4b4d6722cb2b98b0b817020257a9c3ec',
  discordBanner: undefined,
  wallets: [mockWallet]
}
