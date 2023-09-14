import type { NftTraitValue } from '@echo/ui/types/model/nft-trait-value'

export interface TraitFilterGroup {
  trait: string
  values: NftTraitValue[]
}
