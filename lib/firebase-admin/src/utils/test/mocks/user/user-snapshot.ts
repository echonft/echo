/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreSnapshot } from '../../../../types/abstract/firestore-snapshot'
import { discordGuildReferences } from '../discord-guild/discord-guild-reference'
import { FirestoreUser } from '@echo/firestore'

export const userSnapshots: { [key: string]: FirestoreSnapshot<FirestoreUser> } = {
  oE6yUEQBPn7PZ89yMjKn: {
    // @ts-ignore
    ref: {
      path: 'users/oE6yUEQBPn7PZ89yMjKn'
    },
    id: 'oE6yUEQBPn7PZ89yMjKn',
    exists: true,
    data: () => ({
      discordId: '123456',
      discordUsername: 'johnnycage#0890',
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      discordGuilds: [discordGuildReferences['xA40abnyBq6qQHSYmtHj']!],
      discordAvatar: '4b4d6722cb2b98b0b817020257a9c3ec',
      discordBanner: undefined,
      wallets: [
        {
          address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8',
          chainId: 1
        },
        {
          address: '0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9',
          chainId: 1
        },
        {
          address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE',
          chainId: 1
        }
      ]
    })
  }
}
