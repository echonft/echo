import { discordGuildSnapshot } from './discord-guild-snapshot'
import { FirestoreDiscordGuild } from '@echo/firestore'
import { DocumentReference } from 'firebase-admin/firestore'

export const discordGuildReferences: { [key: string]: DocumentReference<FirestoreDiscordGuild> } = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  xA40abnyBq6qQHSYmtHj: {
    path: 'guilds/xA40abnyBq6qQHSYmtHj',
    id: 'xA40abnyBq6qQHSYmtHj',
    get: () => Promise.resolve(discordGuildSnapshot['xA40abnyBq6qQHSYmtHj']!)
  }
}
