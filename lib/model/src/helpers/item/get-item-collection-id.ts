import { type Item } from '@echo/model/types/item'
import { path } from 'ramda'

export function getItemCollectionId(item: Item) {
  return path(['nft', 'collection', 'id'], item)
}
