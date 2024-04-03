import type { HeliusBasePagingResultResponse } from '@echo/alchemy/helius/types/response/helius-base-paging-result-response'

interface NftMetadata {
  attributes?: { value: string; trait_type: string }[]
  description: string
  name: string
  symbol: string
  token_standard: string
}

interface NftFile {
  uri: string
  cdn_uri: string
  mime: string
}

interface NftLinks {
  external_url?: string
  image: string
}

interface NftAuthorities {
  address: string
  scopes: string[]
}

interface NftGrouping {
  group_key: string
  group_value: string
}

interface NftRoyalty {
  royalty_model: string
  target: any
  percent: number
  basis_points: number
  primary_sale_happened: boolean
  locked: boolean
}

interface NftCreators {
  address: string
  share: number
  verified: boolean
}

interface NftCompression {
  eligible: boolean
  compressed: boolean
  data_hash: string
  creator_hash: string
  asset_hash: string
  tree: string
  seq: number
  leaf_id: number
}

interface NftOwnership {
  frozen: boolean
  delegated: boolean
  delegate: string | null
  ownership_model: string
  owner: string
}

interface NftSupply {
  print_max_supply: number
  print_current_supply: number
  edition_nonce: number | null
}

interface NftTokenInfo {
  supply: number
  decimals: number
  token_program: string
  associated_token_address: string
}

export interface NftItem {
  interface: string
  id: string
  content: {
    $schema: string
    json_uri: string
    files: NftFile[]
    metadata: NftMetadata
    links: NftLinks
  }
  authorities: NftAuthorities[]
  compression: NftCompression
  grouping: NftGrouping[]
  royalty: NftRoyalty
  creators: NftCreators[]
  ownership: NftOwnership
  supply: NftSupply
  mutable: boolean
  burnt: boolean
  token_info: NftTokenInfo
}

export interface HeliusGetNftsForOwnerResponse extends HeliusBasePagingResultResponse {
  items: NftItem[]
}
