import { fetchApi } from './client'
import { ApiRoutes, UserHasNftResponse } from '@echo/api'

export const getHasNft = (discordId: string, guildId: string) =>
  fetchApi<UserHasNftResponse>(ApiRoutes.HAS_NFT, 'GET', undefined, {
    discordId,
    guildId
  }).then((response) => response.hasNft)
