import { discordProfileSchema } from '@echo/backend/validators/discord-profile-schema'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { discordApiRoutes } from '@echo/routing/constants/discord-api-routes'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { andThen, pipe } from 'ramda'

export async function fetchDiscordProfile(token: string): Promise<UserDocument> {
  const init = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
  return pipe(fetch, andThen(parseResponse(discordProfileSchema)))(discordApiRoutes.user.me.getUrl(), init)
}
