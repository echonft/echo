import { type Selectable } from '@echo/ui/types/selectable'

export interface CollectionFilter extends Selectable {
  name: string
  id: string
  count: number
}
