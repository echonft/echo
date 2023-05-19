import { discordGuildSnapshot } from './discord-guild-snapshot'
import { FirestoreDiscordGuild } from '@echo/firestore'
import { DocumentReference } from 'firebase-admin/firestore'

export const discordGuildReferences: { [key: string]: DocumentReference<FirestoreDiscordGuild> } = {
  xA40abnyBq6qQHSYmtHj: {
    path: 'guilds/xA40abnyBq6qQHSYmtHj',
    id: 'xA40abnyBq6qQHSYmtHj',
    get: () => Promise.resolve(discordGuildSnapshot['xA40abnyBq6qQHSYmtHj']!)
  } as unknown as DocumentReference<FirestoreDiscordGuild>,
  ncUnbpFfVCofV9bD7ctn: {
    path: 'guilds/ncUnbpFfVCofV9bD7ctn',
    id: 'ncUnbpFfVCofV9bD7ctn',
    get: () => Promise.resolve(discordGuildSnapshot['ncUnbpFfVCofV9bD7ctn']!)
  } as unknown as DocumentReference<FirestoreDiscordGuild>
}
