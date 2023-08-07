import { NftTraitValue } from '@echo/model'

export const compareNftTraitValueSelections = (valueA: NftTraitValue, valueB: NftTraitValue) =>
  valueA.value.localeCompare(valueB.value)
