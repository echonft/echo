import { userByDiscordUsernameComparator } from '@echo/model/helpers/user/user-by-discord-username-comparator'
import type { PartialOwnedNft } from '@echo/model/types/nft'

export function ownedNftComparator(nftA: PartialOwnedNft, nftB: PartialOwnedNft) {
  return userByDiscordUsernameComparator(nftA.owner, nftB.owner)
}
