import { any, equals } from 'ramda'

// TODO Add tests
export const userIsInGuildWithId = (userGuildIds: string[], guildId: string) => any(equals(guildId), userGuildIds)
