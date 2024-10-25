import type { AbstractItem } from '@echo/model/types/abstract-item'

export function itemToken<T extends AbstractItem>(item: T): T['token'] {
  return item.token
}
