/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreSnapshot } from '../../../../types/abstract/firestore-snapshot'
import { contractReferences } from '../contract/contract-reference'
import { FirestoreDiscordGuild } from '@echo/firestore'

export const discordGuildSnapshot: { [key: string]: FirestoreSnapshot<FirestoreDiscordGuild> } = {
  xA40abnyBq6qQHSYmtHj: {
    // @ts-ignore
    ref: {
      path: 'guilds/xA40abnyBq6qQHSYmtHj'
    },
    id: 'xA40abnyBq6qQHSYmtHj',
    exists: true,
    data: () => ({
      discordId: '1',
      channelId: '1',
      name: 'Echo Test',
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      contracts: [contractReferences['37dBlwJYahEAKeL0rNP8']!]
    })
  }
}
