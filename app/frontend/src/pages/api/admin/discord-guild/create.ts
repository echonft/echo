import { createDiscordGuildHandler, withAdmin, withMethodValidation } from '@echo/api'
import { ApiRequest, CreateDiscordRequest, DiscordGuildResponse, ErrorResponse } from '@echo/api-public'
import { NextApiResponse } from 'next'

const createDiscordGuild = async (
  req: ApiRequest<CreateDiscordRequest, never>,
  res: NextApiResponse<ErrorResponse | DiscordGuildResponse>
) => {
  try {
    await withMethodValidation(withAdmin(createDiscordGuildHandler), ['PUT'])(req, res)
  } catch (error) {
    return
  }
}

export default createDiscordGuild
