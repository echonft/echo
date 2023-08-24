import { createUser } from '../user/create-user'
import { fetchDiscordUser } from '../user/fetch-discord-user'
import { findUserByDiscordId } from '../user/find-user-by-discord-id'
import { updateUser } from '../user/update-user'
import { updateUserNfts } from '../user/update-user-nfts'
import { isNilOrEmpty } from '@echo/utils'
import { isNil } from 'ramda'

export const createOrUpdateUser = async (
  accessToken: string | undefined,
  tokenType: string | undefined,
  discordId: string | undefined
) => {
  if (isNilOrEmpty(accessToken) || isNilOrEmpty(tokenType)) {
    throw Error('Auth error: missing access token')
  }
  if (isNilOrEmpty(discordId)) {
    throw Error('Auth error: missing Discord Id')
  }
  const user = await fetchDiscordUser(accessToken, tokenType)
  const foundUser = await findUserByDiscordId(user.discordId)
  if (isNil(foundUser)) {
    await createUser(user)
  } else {
    await updateUserNfts(foundUser)
    await updateUser(foundUser.id, user)
  }
}
