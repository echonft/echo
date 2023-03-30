import { convertUser } from '../../converters/user/convert-user'
import { getFirestoreDiscordGuildRefByDiscordId } from '../../data/discord-guild/get-firestore-discord-guild-ref-by-discord-id'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { FirestoreUser, mapUser } from '@echo/firestore'
import { User } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { always, andThen, isNil, pipe, reject } from 'ramda'

export const updateUserGuilds = (userId: string, guildIds: string[]) => {
  const userRef = getDocRefFromPath<FirestoreUser>('users', userId)
  if (isNil(userRef)) {
    return R.fromPromise(Promise.reject('User not found'))
  }
  return Promise.all(guildIds.map((discordId) => getFirestoreDiscordGuildRefByDiscordId(discordId).then(R.toUndefined)))
    .then(reject(isNil))
    .then((guilds) =>
      userRef
        .update({
          guilds
        })
        .then(pipe(always(userRef.get()), andThen(pipe(convertUser, mapUser, R.fromPromise<User>))))
    )
}
