import { fetchApi } from './client'
import { ApiRoutes } from '@echo/api/dist/routes/constants/api-routes'
import { UserHasNftResponse } from '@echo/api/dist/types/models/responses/user-has-nft-response'

export const getHasNft = (discordId: string, guildId: string) =>
  fetchApi<UserHasNftResponse>(ApiRoutes.HAS_NFT, 'GET', undefined, {
    discordId,
    guildId
  }).then((response) => response.hasNft)
