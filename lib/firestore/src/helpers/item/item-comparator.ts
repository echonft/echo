import { mapNftToNftIndex } from '@echo/model/helpers/nft/map-nft-to-nft-index'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { User } from '@echo/model/types/user'
import { assoc, dissoc, eqBy, pipe } from 'ramda'

interface PartialItem extends NftIndex {
  owner: Omit<User, 'discord'>
}

function mapItem(item: Nft): PartialItem {
  const { owner } = item
  return pipe(mapNftToNftIndex, assoc('owner', dissoc('discord', owner)))(item)
}

/**
 * Compares two items of type Nft using the eqBy function.
 * only the owner and index are relevant
 * @param {Nft} itemA - The first item to compare.
 * @param {Nft} itemB - The second item to compare.
 * @return {boolean} - Returns true if the items are equal, false otherwise.
 */
export function itemComparator(itemA: Nft, itemB: Nft): boolean {
  return eqBy(mapItem, itemA, itemB)
}
