import { convertUser } from '../../converters/user/convert-user'
import { getFirestoreDiscordGuildRefsByDiscordIds } from '../../data/discord-guild/get-firestore-discord-guild-refs-by-discord-ids'
import { FirestoreUserPrototype } from '../../types/prototypes/user/firestore-user-prototype'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { FirestoreUser, mapUser } from '@echo/firestore'
import { User } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { always, andThen, isNil, pipe } from 'ramda'

export const updateUserDiscordInfo = (userId: string, userPrototype: FirestoreUserPrototype) => {
  const userRef = getDocRefFromPath<FirestoreUser>('users', userId)
  if (isNil(userRef)) {
    return R.fromPromise(Promise.reject('User not found'))
  }
  return getFirestoreDiscordGuildRefsByDiscordIds(userPrototype.discordGuildIds).then((guilds) =>
    userRef
      .update({
        discordAvatar: userPrototype.discordAvatar,
        discordBanner: userPrototype.discordBanner,
        discordGuilds: guilds
      } as unknown as Partial<FirestoreUser>)
      .then(pipe(always(userRef.get()), andThen(pipe(convertUser, mapUser, R.fromPromise<User>))))
  )
}
