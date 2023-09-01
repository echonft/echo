import { mapUserToAuthUser } from '../../mappers/auth/map-user-to-auth-user'
import { AuthUser } from '../../types/auth/auth-user'
import { DiscordUser } from '../../types/user/discord-user'
import { createUser } from '../user/create-user'
import { fetchDiscordUser } from '../user/fetch-discord-user'
import { findUserByDiscordId } from '../user/find-user-by-discord-id'
import { updateUser } from '../user/update-user'
import { updateUserNfts } from '../user/update-user-nfts'
import { User } from '@echo/firestore'
import { isNilOrEmpty, modifyNumberPropToDate } from '@echo/utils'
import dayjs from 'dayjs'
import { assoc, isNil } from 'ramda'

async function updateUserInFirestore(user: User, discordUser: DiscordUser) {
  const updatedAt = dayjs()
  // TODO check nftsUpdatedAt
  await updateUserNfts(user)
  // TODO add nftsUpdatedAt
  await updateUser(user.id, { ...discordUser, updatedAt })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return mapUserToAuthUser({ ...discordUser, updatedAt, id: user.id, wallets: user.wallets })
}

async function createOrUpdateUserInFirestore(accessToken: string, tokenType: string) {
  const discordUser = await fetchDiscordUser(accessToken, tokenType)
  const existingUser = await findUserByDiscordId(discordUser.discordId)
  if (isNil(existingUser)) {
    const userId = await createUser(discordUser)
    return { ...discordUser, id: userId, updatedAt: dayjs().unix(), wallets: [] }
  } else {
    return updateUserInFirestore(existingUser, discordUser)
  }
}

export async function createOrUpdateUser(
  accessToken: string | undefined,
  tokenType: string | undefined,
  user: AuthUser | undefined
) {
  if (isNilOrEmpty(accessToken)) {
    throw Error(`invalid access token`)
  }
  if (isNilOrEmpty(tokenType)) {
    throw Error(`invalid token type`)
  }
  if (isNil(user)) {
    return await createOrUpdateUserInFirestore(accessToken, tokenType)
  } else {
    const updatedAt = dayjs.unix(user.updatedAt)
    // if the user has last been updated more than 1h ago, update it
    if (updatedAt.add(1, 'hour').isBefore(dayjs())) {
      const discordUser = await fetchDiscordUser(accessToken, tokenType)
      return await updateUserInFirestore(modifyNumberPropToDate('updatedAt')(user) as User, discordUser)
    }
    // else return the user as is
    return assoc('updatedAt', dayjs().unix())(user)
  }
}
