import { convertDiscordGuild } from '../../converters/discord-guild'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { FirestoreDiscordGuild } from '@echo/firestore'

export const getFirestoreDiscordGuildData = (documentPath: string) =>
  getDocSnapshot<FirestoreDiscordGuild>('guilds', documentPath).then(convertDiscordGuild)
