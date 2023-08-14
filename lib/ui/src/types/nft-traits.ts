export interface NftTraitValue {
  value: string
  count: number
}

export interface NftTraits {
  [key: string]: NftTraitValue[]
}
