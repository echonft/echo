import { type Item } from '@echo/model/types/item'
import { path } from 'ramda'

export function getItemTokenId(item: Item) {
  return path(['nft', 'tokenId'], item)
}
