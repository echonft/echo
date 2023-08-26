import { createUser } from '../user/create-user'
import { fetchDiscordUser } from '../user/fetch-discord-user'
import { findUserByDiscordId } from '../user/find-user-by-discord-id'
import { updateUser } from '../user/update-user'
import { updateUserNfts } from '../user/update-user-nfts'
import { parseCreateOrUpdateUserArguments } from './parse-create-or-update-user-arguments'
import { isNil } from 'ramda'

export const createOrUpdateUser = async (
  accessToken: string | undefined,
  tokenType: string | undefined,
  discordId: string | undefined
) => {
  // FIXME do we even need discordId here?!
  const validatedArguments = parseCreateOrUpdateUserArguments({ accessToken, tokenType, discordId })
  const user = await fetchDiscordUser(validatedArguments.accessToken, validatedArguments.tokenType)
  const foundUser = await findUserByDiscordId(user.discordId)
  if (isNil(foundUser)) {
    await createUser(user)
  } else {
    await updateUserNfts(foundUser)
    await updateUser(foundUser.id, user)
  }
}
