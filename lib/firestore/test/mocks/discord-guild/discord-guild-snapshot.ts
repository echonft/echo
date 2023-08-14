import { FirestoreSnapshot } from '../../../src/types/abstract/firestore-snapshot'
import { FirestoreDiscordGuild } from '../../../src/types/model/collections/discord-guild/firestore-discord-guild'
import { discordGuildFirestoreData } from './discord-guild-firestore-data'
import { always, omit } from 'ramda'

export const discordGuildSnapshot: { [key: string]: FirestoreSnapshot<FirestoreDiscordGuild> } = {
  xA40abnyBq6qQHSYmtHj: {
    ref: {
      path: 'guilds/xA40abnyBq6qQHSYmtHj'
    },
    id: 'xA40abnyBq6qQHSYmtHj',
    exists: true,
    data: always(omit(['refPath', 'id'], discordGuildFirestoreData['xA40abnyBq6qQHSYmtHj']))
  } as unknown as FirestoreSnapshot<FirestoreDiscordGuild>,
  ncUnbpFfVCofV9bD7ctn: {
    ref: {
      path: 'guilds/ncUnbpFfVCofV9bD7ctn'
    },
    id: 'ncUnbpFfVCofV9bD7ctn',
    exists: true,
    data: always(omit(['refPath', 'id'], discordGuildFirestoreData['ncUnbpFfVCofV9bD7ctn']))
  } as unknown as FirestoreSnapshot<FirestoreDiscordGuild>
}
