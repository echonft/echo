import { NftTraitValue } from '../../types/nft-traits'

export const compareNftTraitValueSelections = (valueA: NftTraitValue, valueB: NftTraitValue) =>
  valueA.value.localeCompare(valueB.value)
