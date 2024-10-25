import { userByDiscordUsernameComparator } from '@echo/model/helpers/user/user-by-discord-username-comparator'

import type { OwnedNftIndex } from '@echo/model/types/owned-nft'

export function nftOwnerComparator(nftA: OwnedNftIndex, nftB: OwnedNftIndex) {
  return userByDiscordUsernameComparator(nftA.owner, nftB.owner)
}
