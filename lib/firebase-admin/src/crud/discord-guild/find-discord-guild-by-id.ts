import { getFirestoreDiscordGuildData } from '../../data/discord-guild/get-firestore-discord-guild-data'

export const findDiscordGuildById = (id: string) => getFirestoreDiscordGuildData(id)
