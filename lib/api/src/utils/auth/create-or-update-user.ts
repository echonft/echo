import { mapDiscordUserResponseToUserPrototype } from '../../mappers/map-discord-user-response-to-user-prototype'
import { updateUserNfts } from '../handler/update-user-nfts'
import { fetchDiscordUser } from '@echo/discord'
import { addUser, findUserByDiscordId, updateUserDiscordInfo } from '@echo/firebase-admin'
import { isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'

export function createOrUpdateUser(
  accessToken: string | undefined,
  tokenType: string | undefined,
  discordId: string | undefined
) {
  if (isNilOrEmpty(accessToken) || isNilOrEmpty(tokenType)) {
    return R.fromPromise(Promise.reject('Auth error: missing access token'))
  }
  if (isNilOrEmpty(discordId)) {
    return R.fromPromise(Promise.reject('Auth error: missing Discord Id'))
  }
  return Promise.all([findUserByDiscordId(discordId), fetchDiscordUser(accessToken, tokenType, true)]).then(
    ([userResult, discordUserResponse]) => {
      if (R.isError(discordUserResponse)) {
        return R.fromPromise(Promise.reject('Auth error: error fetching discord user'))
      }
      // TODO Add validation on response
      const userPrototype = mapDiscordUserResponseToUserPrototype(R.getExn(discordUserResponse))
      // User is not found, we create it
      if (R.isError(userResult)) {
        return addUser(userPrototype)
      }
      // Else update user discord info and update NFTs
      return updateUserNfts(R.getExn(userResult)).then(() =>
        updateUserDiscordInfo(R.getExn(userResult).id, userPrototype)
      )
    }
  )
}
