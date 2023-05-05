/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreSnapshot } from '../../../../types/abstract/firestore-snapshot'
import { contractReferences } from '../contract/contract-reference'
import { FirestoreDiscordGuild } from '@echo/firestore'

export const discordGuildSnapshot: { [key: string]: FirestoreSnapshot<FirestoreDiscordGuild> } = {
  xA40abnyBq6qQHSYmtHj: {
    ref: {
      path: 'guilds/xA40abnyBq6qQHSYmtHj'
    },
    id: 'xA40abnyBq6qQHSYmtHj',
    exists: true,
    data: () => ({
      discordId: '1',
      channelId: '1',
      name: 'Echo Test',
      contracts: [contractReferences['37dBlwJYahEAKeL0rNP8']!]
    })
  } as unknown as FirestoreSnapshot<FirestoreDiscordGuild>,
  ncUnbpFfVCofV9bD7ctn: {
    ref: {
      path: 'guilds/ncUnbpFfVCofV9bD7ctn'
    },
    id: 'ncUnbpFfVCofV9bD7ctn',
    exists: true,
    data: () => ({
      discordId: '100',
      channelId: '100',
      name: 'Echo Test2',
      contracts: [contractReferences['37dBlwJYahEAKeL0rNP8']!]
    })
  } as unknown as FirestoreSnapshot<FirestoreDiscordGuild>
}
