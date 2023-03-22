import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/models/api-requests/api-request'
import { UserHasNftRequest } from '../../types/models/requests/user-has-nft-request'
import { UserHasNftResponse } from '../../types/models/responses/user-has-nft-response'
import { getAlchemy } from '../../utils/alchemy/alchemy'
import { walletsOwnCollection } from '../../utils/alchemy/wallets-own-collection'
import { getGuildById } from '../../utils/guild'
import { getUserWithDiscordId } from '../../utils/user'
import { mergeWalletsAndContractsByChainId } from '@echo/utils'
import { isEmpty, isNil } from 'ramda'

export const getHasNftHandler: RequestHandler<ApiRequest<null, UserHasNftRequest>, UserHasNftResponse> = async (
  req,
  res
) => {
  const user = await getUserWithDiscordId(req.query.discordId)
  if (isNil(user) || isNil(user?.wallets) || isEmpty(user?.wallets)) {
    res.status(500).json({ error: `User ${req.query.discordId} not found or has no wallet registered` })
    return
  }
  // Safe cast of user.wallets as we do a check for empty wallet beforehand
  const guild = await getGuildById(req.query.guildId)
  if (isNil(guild) || isNil(guild?.contracts) || isEmpty(guild?.contracts)) {
    res.status(500).json({ error: `Guild ${req.query.guildId} not found or has no contracts registered` })
    return
  }
  const alchemy = getAlchemy()
  const mergedWalletsAndContracts = mergeWalletsAndContractsByChainId(user.wallets, guild.contracts)
  Promise.all(
    Object.values(mergedWalletsAndContracts).map((value) =>
      walletsOwnCollection(alchemy, value.wallets, value.contracts)
    )
  )
    .then((isHoldingCollections) =>
      res.status(200).json({ hasNft: isHoldingCollections.some((isHoldingCollection) => isHoldingCollection) })
    )
    .catch((err) => res.status(500).json({ error: err as string }))
}
