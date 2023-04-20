import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/model/api-requests/api-request'
import { CreateListingRequest } from '../../types/model/requests/create-listing-request'
import { CreateListingResponse } from '../../types/model/responses/create-listing.response'
import { createListingSchema } from '../../types/validators/create-listing'
import { findDiscordGuildByGuildId } from '@echo/firebase-admin'
import { userIsInGuild } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'

export const CreateListingHandler: RequestHandler<
  ApiRequest<CreateListingRequest, never>,
  CreateListingResponse
> = async (req, res, session) => {
  // TODO Shouldn't have to do that
  if (isNil(session)) {
    res.end(res.status(401).json({ error: 'You must be logged in' }))
    return
  }
  const { user } = session
  if (isNil(user)) {
    res.end(res.status(401).json({ error: 'User not found' }))
    return
  }
  try {
    const validatedRequest = createListingSchema.parse(req.body)
    return findDiscordGuildByGuildId(validatedRequest.discordGuildId).then((discordGuildResult) => {
      if (R.isError(discordGuildResult)) {
        // TODO Should it be a 401?
        res.end(res.status(401).json({ error: 'Discord Guild not found' }))
        return
      }
      const discordGuild = R.getExn(discordGuildResult)
      if (userIsInGuild(user, discordGuild)) {
      } else {
        res.end(res.status(401).json({ error: 'User is not in Discord Guild' }))
        return
      }
    })
  } catch {
    res.end(res.status(400).json({ error: 'Invalid body' }))
    return
  }
}
