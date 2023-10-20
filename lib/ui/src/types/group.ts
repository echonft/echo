import { type Disableable } from '@echo/ui/types/disableable'
import { type Selectable } from '@echo/ui/types/selectable'

export interface Group<T extends Selectable & Disableable> {
  id: string
  name: string
  items: T[]
}
