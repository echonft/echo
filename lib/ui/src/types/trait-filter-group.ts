import type { Selectable } from '@echo/ui/types/selectable'
import type { TraitFilter } from '@echo/ui/types/trait-filter'

export interface TraitFilterGroup {
  id: string
  label: string
  filters: Selectable<TraitFilter>[]
}
