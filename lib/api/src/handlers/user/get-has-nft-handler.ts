import { RequestHandler } from '../../types/handlers/request-handler'
import { ApiRequest } from '../../types/models/api-requests/api-request'
import { UserHasNftRequest } from '../../types/models/requests/user-has-nft-request'
import { UserHasNftResponse } from '../../types/models/responses/user-has-nft-response'
import { getGuildById } from '../../utils/guild'
import { getUserWithDiscordId } from '../../utils/user'
import { head, isEmpty, isNil } from 'ramda'

// TODO Should probably take the chain as param
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
  // TODO Should check all wallets
  const wallet = head(user.wallets)!.address
  const guild = await getGuildById(req.query.guildId)
  if (isNil(guild) || isNil(guild?.contracts) || isEmpty(guild?.contracts)) {
    res.status(500).json({ error: `Guild ${req.query.guildId} not found or has no contracts registered` })
    return
  }
  const options = { method: 'GET', headers: { accept: 'application/json' } }
  // TODO Use SDK or fix url
  Promise.all(
    guild.contracts.map((contract) =>
      fetch(
        `https://eth-mainnet.g.alchemy.com/nft/v2/docs-demo/isHolderOfCollection?wallet=${wallet}&contractAddress=${contract.address}`,
        options
      ).then((response) => response.json() as Promise<{ isHolderOfCollection: boolean }>)
    )
  )
    .then((isHoldingCollections: { isHolderOfCollection: boolean }[]) =>
      res.status(200).json({ hasNft: isHoldingCollections.some((isHoldingCollection) => isHoldingCollection) })
    )
    .catch((err) => res.status(500).json({ error: err as string }))
}
