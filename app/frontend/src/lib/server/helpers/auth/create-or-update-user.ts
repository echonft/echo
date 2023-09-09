import { mapUserToAuthUser } from '../../mappers/auth/map-user-to-auth-user'
import { createUser } from '../user/create-user'
import { fetchDiscordUser } from '../user/fetch-discord-user'
import { getUserByDiscordId } from '../user/get-user-by-discord-id'
import { updateUser } from '../user/update-user'
import { updateUserNfts } from '../user/update-user-nfts'
import { userDiscordInfoNeedsUpdate } from './user-discord-info-needs-update'
import { userNftsNeedsUpdate } from './user-nfts-needs-update'
import { User, UserDiscordGuild, Wallet } from '@echo/firestore-types'
import { AuthUser } from '@echo/ui-model'
import { isNilOrEmpty } from '@echo/utils'
import dayjs from 'dayjs'
import { assoc, isNil, omit, pipe } from 'ramda'

interface RequiredUserProps {
  id: string
  discordAvatar: string | undefined
  discordBanner: string | undefined
  discordId: string
  discordUsername: string
  discordGuilds: UserDiscordGuild[]
  nftsUpdatedAt: dayjs.Dayjs
  updatedAt: dayjs.Dayjs
  username: string
  wallets: Wallet[]
}

async function updateUserAndNftsIfNeeded(user: Partial<User> & RequiredUserProps) {
  let { nftsUpdatedAt, updatedAt } = user
  if (userNftsNeedsUpdate(nftsUpdatedAt)) {
    await updateUserNfts(user)
    nftsUpdatedAt = dayjs()
  }
  if (userDiscordInfoNeedsUpdate(updatedAt)) {
    updatedAt = dayjs()
    await updateUser(
      user.id,
      pipe(omit(['nftsUpdatedAt', 'updatedAt', 'wallets']), assoc('updatedAt', updatedAt))(user)
    )
  }
  return mapUserToAuthUser({ ...user, updatedAt, nftsUpdatedAt })
}

export async function createOrUpdateUser(
  accessToken: string | undefined,
  tokenType: string | undefined,
  user: AuthUser | undefined
): Promise<AuthUser> {
  if (isNilOrEmpty(accessToken)) {
    throw Error(`invalid access token`)
  }
  if (isNilOrEmpty(tokenType)) {
    throw Error(`invalid token type`)
  }
  if (isNil(user)) {
    const discordUser = await fetchDiscordUser(accessToken, tokenType)
    const existingUser = await getUserByDiscordId(discordUser.discordId)
    if (isNil(existingUser)) {
      // for now we set username = discordUsername
      const userId = await createUser({ ...discordUser, username: discordUser.discordUsername })
      return mapUserToAuthUser({
        ...discordUser,
        id: userId,
        nftsUpdatedAt: dayjs(),
        updatedAt: dayjs(),
        username: discordUser.discordUsername,
        wallets: []
      })
    } else {
      // for now we set username = discordUsername
      return await updateUserAndNftsIfNeeded({ ...existingUser, ...discordUser, username: discordUser.discordUsername })
    }
  } else {
    const nftsUpdatedAt = dayjs.unix(user.nftsUpdatedAt)
    const updatedAt = dayjs.unix(user.updatedAt)
    // if the user has last been updated more than 1h ago, update it
    if (userDiscordInfoNeedsUpdate(updatedAt) || userNftsNeedsUpdate(nftsUpdatedAt)) {
      const discordUser = await fetchDiscordUser(accessToken, tokenType)
      // for now we set username = discordUsername
      return await updateUserAndNftsIfNeeded({
        ...user,
        ...discordUser,
        username: discordUser.discordUsername,
        nftsUpdatedAt,
        updatedAt
      })
    }
    // else return the user as is
    return user
  }
}
