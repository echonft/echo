import type { WithId } from '@echo/model/types/with-id'

export interface NftFilter extends WithId {
  label: string
  count: number
}
