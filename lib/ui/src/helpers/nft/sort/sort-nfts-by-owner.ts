import { nftByOwnerDiscordUsernameComparator } from '@echo/model/helpers/nft/nft-by-owner-discord-username-comparator'
import { nftByTokenIdComparator } from '@echo/model/helpers/nft/nft-by-token-id-comparator'
import type { Nft } from '@echo/model/types/nft'
import { sortWith } from 'ramda'

export function sortNftsByOwner(nfts: Nft[]) {
  return sortWith([nftByOwnerDiscordUsernameComparator, nftByTokenIdComparator], nfts)
}
