import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/models/api-requests/api-request'
import { UserHasNftRequest } from '../../types/models/requests/user-has-nft-request'
import { UserHasNftResponse } from '../../types/models/responses/user-has-nft-response'
import { getAlchemy } from '../../utils/alchemy/alchemy'
import { walletsOwnCollection } from '../../utils/alchemy/wallets-own-collection'
import { getGuildById } from '../../utils/guild'
import { isNilOrEmpty, mergeWalletsAndContractsByChainId } from '@echo/utils'
import { isEmpty, isNil } from 'ramda'

export const getHasNftHandler: RequestHandler<ApiRequest<null, UserHasNftRequest>, UserHasNftResponse> = async (
  req,
  res,
  session
) => {
  // TODO Shouldn't have to do that
  if (isNil(session)) {
    res.status(401).json({ error: 'You must be logged in' })
    return Promise.resolve()
  }
  const { user } = session
  if (isNil(user?.wallets) || isEmpty(user?.wallets)) {
    res.status(200).json({ hasNft: false })
    return
  }
  const guild = await getGuildById(req.query.guildId)
  if (isNil(guild) || isNilOrEmpty(guild.contracts)) {
    res.status(500).json({ error: `Guild ${req.query.guildId} not found or has no contracts registered` })
    return
  }
  const alchemy = getAlchemy()
  const mergedWalletsAndContracts = mergeWalletsAndContractsByChainId(user.wallets, guild.contracts)
  return Promise.all(
    Object.values(mergedWalletsAndContracts).map((value) =>
      walletsOwnCollection(alchemy, value.wallets, value.contracts)
    )
  )
    .then((isHoldingCollections) =>
      res.status(200).json({ hasNft: isHoldingCollections.some((isHoldingCollection) => isHoldingCollection) })
    )
    .catch((err) => res.status(500).json({ error: err as string }))
}
