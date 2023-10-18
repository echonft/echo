import { type Item } from '@echo/model/types/item'
import { path } from 'ramda'

export function getItemCollectionId(item: Item): string {
  return path(['nft', 'collection', 'id'], item)
}
