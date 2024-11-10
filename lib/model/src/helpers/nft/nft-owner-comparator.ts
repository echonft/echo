import { userByDiscordUsernameComparator } from '@echo/model/helpers/user/user-by-discord-username-comparator'
import type { OwnedNftIndex } from '@echo/model/types/nft'

export function nftOwnerComparator<T extends OwnedNftIndex>(nftA: T, nftB: T) {
  return userByDiscordUsernameComparator(nftA.owner, nftB.owner)
}
