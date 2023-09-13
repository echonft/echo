import { NftTraitValue } from '@echo/ui/types/model/nft-trait-value'

/**
 * the key name is the trait type
 */
export interface NftTraits {
  [key: string]: NftTraitValue[]
}
