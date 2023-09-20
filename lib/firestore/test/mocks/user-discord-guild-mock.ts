import type { FirestoreUserDiscordGuild } from '@echo/firestore/types/model/firestore-user-discord-guild'
import dayjs from 'dayjs'

export const userDiscordGuildMock: { [key: string]: FirestoreUserDiscordGuild } = {
  FTtQ8IaJAffIaSk66Fy6: {
    id: 'FTtQ8IaJAffIaSk66Fy6',
    guilds: [
      {
        discordId: '100'
      }
    ],
    updatedAt: dayjs.unix(1676984897),
    userId: '6rECUMhevHfxABZ1VNOm'
  },
  '3gWDBihHVUQLJxbiJOIp': {
    id: '3gWDBihHVUQLJxbiJOIp',
    guilds: [
      {
        discordId: '100'
      },
      {
        discordId: '1'
      }
    ],
    updatedAt: dayjs.unix(1676984897),
    userId: 'oE6yUEQBPn7PZ89yMjKn'
  }
}
