import { convertUser } from '../../converters/user/convert-user'
import { getFirestoreDiscordGuildRefsByDiscordIds } from '../../data/discord-guild/get-firestore-discord-guild-refs-by-discord-ids'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName, FirestoreUser, FirestoreUserData, FirestoreUserPrototype } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { always, andThen, isNil, pipe } from 'ramda'

export const updateUserDiscordInfo = (userId: string, userPrototype: FirestoreUserPrototype) => {
  const userRef = getDocRefFromPath<FirestoreUser>(CollectionName.USERS, userId)
  if (isNil(userRef)) {
    return R.fromPromise(Promise.reject('user not found'))
  }
  return getFirestoreDiscordGuildRefsByDiscordIds(userPrototype.discordGuildIds).then((guilds) =>
    userRef
      .update({
        discordAvatar: userPrototype.discordAvatar,
        discordBanner: userPrototype.discordBanner,
        discordGuilds: guilds
      } as unknown as Partial<FirestoreUser>)
      .then(pipe(always(userRef.get()), andThen(pipe(convertUser, R.fromPromise<FirestoreUserData>))))
  )
}
