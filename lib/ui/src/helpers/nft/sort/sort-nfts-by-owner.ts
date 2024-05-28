import { nftByOwnerDiscordUsernameComparator } from '@echo/model/helpers/nft/nft-by-owner-discord-username-comparator'
import { nftByTokenIdComparator } from '@echo/model/helpers/nft/nft-by-token-id-comparator'
import type { Nft } from '@echo/model/types/nft'
import { pipe, sort } from 'ramda'

export function sortNftsByOwner<T extends Nft>(nfts: T[]) {
  return pipe<[T[]], T[], T[]>(sort(nftByOwnerDiscordUsernameComparator), sort(nftByTokenIdComparator))(nfts)
}
