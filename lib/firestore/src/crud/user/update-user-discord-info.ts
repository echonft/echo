import { CollectionName } from '../../config/collection-name'
import { convertUser } from '../../converters/user/convert-user'
import { getFirestoreDiscordGuildRefsByDiscordIds } from '../../data/discord-guild/get-firestore-discord-guild-refs-by-discord-ids'
import { FirestoreUser } from '../../types/model/collections/user/firestore-user'
import { FirestoreUserPrototype } from '../../types/prototypes/user/firestore-user-prototype'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { always, andThen, isNil, pipe } from 'ramda'

export const updateUserDiscordInfo = (userId: string, userPrototype: FirestoreUserPrototype) => {
  const userRef = getDocRefFromPath<FirestoreUser>(CollectionName.USERS, userId)
  if (isNil(userRef)) {
    return Promise.reject('user not found')
  }
  return getFirestoreDiscordGuildRefsByDiscordIds(userPrototype.discordGuildIds).then((guilds) =>
    userRef
      .update({
        discordAvatar: userPrototype.discordAvatar,
        discordBanner: userPrototype.discordBanner,
        discordGuilds: guilds
      } as unknown as Partial<FirestoreUser>)
      .then(pipe(always(userRef.get()), andThen(convertUser)))
  )
}
