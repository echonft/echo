import type { FirestoreDiscordUser } from '@echo/firestore/types/model/firestore-discord-user'
import dayjs from 'dayjs'

export const discordUserMock: { [key: string]: FirestoreDiscordUser } = {
  be5KGz2BfBRYbA1mCKQp: {
    id: 'be5KGz2BfBRYbA1mCKQp',
    userId: '6rECUMhevHfxABZ1VNOm',
    discordId: '884593489189433364',
    discordUsername: 'crewnft_',
    discordGuilds: [
      {
        discordId: '100'
      }
    ],
    discordAvatar: '6080eecbd12f0f7bb2299690661535cf',
    discordBanner: '17f80cca207c35c7fa6d0194696c5e7b',
    updatedAt: dayjs.unix(1676984897)
  },
  WpgDZHmdpvHjykHRRWp7: {
    id: 'WpgDZHmdpvHjykHRRWp7',
    userId: 'oE6yUEQBPn7PZ89yMjKn',
    discordId: '462798252543049728',
    discordUsername: 'johnnycagewins',
    discordGuilds: [
      {
        discordId: '100'
      },
      {
        discordId: '1'
      }
    ],
    updatedAt: dayjs.unix(1676984897)
  }
}
