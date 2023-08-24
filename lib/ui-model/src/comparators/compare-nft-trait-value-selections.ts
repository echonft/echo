import { NftTraitValue } from '../types/nft-trait-value'

export function compareNftTraitValueSelections(valueA: NftTraitValue, valueB: NftTraitValue) {
  return valueA.value.localeCompare(valueB.value)
}
