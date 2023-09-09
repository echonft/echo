import { NftFilterCollections, NftFilterTraits } from '../constants/nft-filter'

export type NftFilter = typeof NftFilterTraits | typeof NftFilterCollections
