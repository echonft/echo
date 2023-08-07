import { RequestHandler } from '../../types/handlers/request-handler'
import { createDiscordSchema } from '../../types/validators/create-discord'
import { createDiscordFromRequest } from '../../utils/handler/create-discord-from-request'
import { ApiRequest, CreateDiscordRequest, DiscordGuildResponse } from '@echo/api-public'
import { findContractsByAddresses } from '@echo/firebase-admin'
import { errorMessage, logger } from '@echo/utils'

export const createDiscordGuildHandler: RequestHandler<
  ApiRequest<CreateDiscordRequest, never>,
  DiscordGuildResponse
  // eslint-disable-next-line @typescript-eslint/require-await
> = async (req, res) => {
  try {
    const validatedRequest = createDiscordSchema.parse(req.body)
    findContractsByAddresses(validatedRequest.contracts)
      .then(() => {
        res.end(res.status(400).json({ error: 'Contracts already in database' }))
        return
      })
      .finally(() => {
        createDiscordFromRequest(validatedRequest)
          .then((discordGuildData) => res.status(200).json(discordGuildData))
          .catch((e) => {
            logger.error(`createDiscordGuildHandler error creating discord ${errorMessage(e)}`)
            res.end(res.status(500).json({ error: 'Error creating Discord Guild' }))
            return
          })
      })
  } catch (error) {
    res.end(res.status(400).json({ error: 'Invalid body' }))
    return
  }
}
