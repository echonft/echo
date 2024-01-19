import type { Item } from '@echo/model/types/item'
import type { Nft } from '@echo/model/types/nft'
import { getNftStackFromArray } from '@echo/ui/helpers/stack/get-nft-stack-from-array'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { always, ifElse, isEmpty, map, pipe, prop } from 'ramda'

export function getNftStackFromItems(items: Item[]): NftStack | undefined {
  return ifElse(
    isEmpty,
    always(undefined),
    pipe<[Item[]], Nft[], NftStack | undefined>(map<Item, Nft>(prop('nft')), getNftStackFromArray)
  )(items)
}
