import { userByDiscordUsernameComparator } from '@echo/model/helpers/user/user-by-discord-username-comparator'
import type { OwnedNftIndex } from '@echo/model/types/nft'

export function ownedNftComparator(nftA: OwnedNftIndex, nftB: OwnedNftIndex) {
  return userByDiscordUsernameComparator(nftA.owner, nftB.owner)
}
