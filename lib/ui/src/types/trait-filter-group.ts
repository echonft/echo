import type { WithId } from '@echo/model/types/with-id'
import type { Selectable } from '@echo/ui/types/selectable'
import type { TraitFilter } from '@echo/ui/types/trait-filter'

export interface TraitFilterGroup extends WithId {
  label: string
  filters: Selectable<TraitFilter>[]
}
