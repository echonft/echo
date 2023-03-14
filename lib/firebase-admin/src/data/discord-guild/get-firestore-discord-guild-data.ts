import { convertDiscordGuild } from '../../converters/discord-guild'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { andThen, pipe } from 'ramda'

export const getFirestoreDiscordGuildData = (documentPath: string) =>
  pipe(getDocSnapshot, andThen(convertDiscordGuild))('guilds', documentPath)
