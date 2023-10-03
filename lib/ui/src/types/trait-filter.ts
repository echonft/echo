import { Selectable } from '@echo/ui/types/selectable'

export interface TraitFilter extends Selectable {
  trait: string
  value: string
  count: number
}
