import type { NftTraitValue } from '@echo/ui/types/model/nft-trait-value'

export function compareNftTraitValueSelections(valueA: NftTraitValue, valueB: NftTraitValue) {
  return valueA.value.localeCompare(valueB.value)
}
