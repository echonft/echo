import { userByDiscordUsernameComparator } from '@echo/model/helpers/user/user-by-discord-username-comparator'
import type { Nft } from '@echo/model/types/nft'

export function nftByOwnerDiscordUsernameComparator<
  T extends Partial<Nft> &
    Required<{
      owner: {
        discord: Pick<Nft['owner']['discord'], 'username'>
      }
    }>
>(nftA: T, nftB: T) {
  return userByDiscordUsernameComparator(nftA.owner, nftB.owner)
}
