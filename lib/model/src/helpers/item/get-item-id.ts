import { type Item } from '@echo/model/types/item'
import { path } from 'ramda'

export function getItemId(item: Item): string {
  return path(['nft', 'id'], item)
}
