import { buildUser } from '../../builders/user/build-user'
import { FirestoreUserPrototype } from '../../types/prototypes/user/firestore-user-prototype'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { findUserByDiscordId } from './find-user-by-discord-id'
import { User } from '@echo/model'
import { R } from '@mobily/ts-belt'

export const addUser: (userPrototype: FirestoreUserPrototype) => Promise<R.Result<User, Error>> = (userPrototype) =>
  buildUser(userPrototype).then((user) =>
    getCollectionFromPath('users')
      .doc()
      .set(user)
      .then(() => findUserByDiscordId(userPrototype.discordId))
  )
