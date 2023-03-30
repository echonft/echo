import { mapDiscordUserResponseToUserPrototype } from '../../mappers/map-discord-user-response-to-user-prototype'
import { fetchDiscordUser } from '@echo/discord'
import { addUser } from '@echo/firebase-admin'
import { User } from '@echo/model'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, pipe, useWith } from 'ramda'

export const createNewUser = (accessToken: string, tokenType: string): Promise<R.Result<User, Error>> =>
  pipe(
    fetchDiscordUser,
    andThen(R.map(useWith(addUser, [mapDiscordUserResponseToUserPrototype]))),
    castAs<Promise<R.Result<User, Error>>>
  )(accessToken, tokenType)
