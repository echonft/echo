import { ApiRequest, createDiscordGuildHandler, ErrorResponse, withAdmin, withMethodValidation } from '@echo/api'
import { CreateDiscordRequest, DiscordGuildResponse } from '@echo/api/dist/types'
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
