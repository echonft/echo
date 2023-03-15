import { fetchApi } from './client'
import { ApiRoutes, UserHasNftResponse } from '@echo/api'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

export const getHasNft = async (discordId: string, guildId: string) => {
  const result = await pipe(fetchApi, R.fromPromise<UserHasNftResponse>)(ApiRoutes.HAS_NFT, 'GET', undefined, {
    discordId,
    guildId
  })
  if (R.isOk(result)) {
    return R.getExn(result).hasNft
  }
  return Promise.resolve(false)
}
