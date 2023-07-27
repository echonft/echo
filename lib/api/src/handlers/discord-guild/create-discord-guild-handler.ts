import { DiscordGuildResponse } from '../../types'
import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/model/api-requests/api-request'
import { CreateDiscordRequest } from '../../types/model/requests/create-discord-request'
import { createDiscordSchema } from '../../types/validators/create-discord'
import { createDiscordFromRequest } from '../../utils/handler/create-discord-from-request'
import { findContractsByAddresses } from '@echo/firebase-admin'
import { errorMessage, logger } from '@echo/utils'
import { R } from '@mobily/ts-belt'

export const createDiscordGuildHandler: RequestHandler<
  ApiRequest<CreateDiscordRequest, never>,
  DiscordGuildResponse
> = async (req, res) => {
  try {
    const validatedRequest = createDiscordSchema.parse(req.body)
    // Check if contracts exists
    const contractResults = await findContractsByAddresses(validatedRequest.contracts)
    if (R.isOk(contractResults)) {
      res.end(res.status(400).json({ error: 'Contracts already in database' }))
      return
    }
    return createDiscordFromRequest(validatedRequest)
      .then((discordGuildData) => res.status(200).json(discordGuildData))
      .catch((e) => {
        logger.error(`createDiscordGuildHandler error creating discord ${errorMessage(e)}`)
        res.end(res.status(500).json({ error: 'Error creating Discord Guild' }))
        return
      })
  } catch (error) {
    res.end(res.status(400).json({ error: 'Invalid body' }))
    return
  }
}
