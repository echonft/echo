import { createUser } from '../user/create-user'
import { fetchDiscordUser } from '../user/fetch-discord-user'
import { findUserByDiscordId } from '../user/find-user-by-discord-id'
import { updateUser } from '../user/update-user'
import { updateUserNfts } from '../user/update-user-nfts'
import { isNilOrEmpty } from '@echo/utils'
import { isNil } from 'ramda'

export const createOrUpdateUser = async (accessToken: string | undefined, tokenType: string | undefined) => {
  if (isNilOrEmpty(accessToken)) {
    throw Error(`invalid access token`)
  }
  if (isNilOrEmpty(tokenType)) {
    throw Error(`invalid token type`)
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
