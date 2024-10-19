import type { AbstractItem } from '@echo/model/types/item/abstract-item'

export function itemToken<T extends AbstractItem>(item: T): T['token'] {
  return item.token
}
