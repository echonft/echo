import type { discordAuthQueryParamsSchema } from '@echo/routing/validators/api/discord-auth-query-params-schema'
import { z } from 'zod'

export type DiscordAuthQueryParams = z.infer<typeof discordAuthQueryParamsSchema>
