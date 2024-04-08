export interface DigitalAsset {
  authorities: Authority[]
  burnt: boolean
  compression: Compression
  content: Content
  creators: Creator[]
  grouping: Grouping[]
  id: string
  inscription?: Inscription
  interface: string
  mutable: boolean
  ownership: Ownership
  royalty: Royalty
  supply: Supply
  token_info: TokenInfo
}

export interface Content {
  $schema: string
  json_uri: string
  files: File[]
  metadata: Metadata
  links: Links
}

export interface File {
  uri: string
  cdn_uri: string
  mime: string
}

export interface Metadata {
  attributes: Attribute[]
  description: string
  name: string
  symbol: string
  token_standard: string
}

export interface Attribute {
  value: string
  trait_type: string
}

export interface Links {
  image: string
  external_url: string
}

export interface Authority {
  address: string
  scopes: string[]
}

export interface Compression {
  eligible: boolean
  compressed: boolean
  data_hash: string
  creator_hash: string
  asset_hash: string
  tree: string
  seq: number
  leaf_id: number
}

export interface Grouping {
  group_key: string
  group_value: string
  collection_metadata?: CollectionMetadata
}

export interface CollectionMetadata {
  name: string
  symbol: string
  image: string
  description: string
  external_url: string
}

export interface Royalty {
  royalty_model: string
  target: string
  percent: number
  basis_points: number
  primary_sale_happened: boolean
  locked: boolean
}

export interface Creator {
  address: string
  share: number
  verified: boolean
}

export interface Ownership {
  frozen: boolean
  delegated: boolean
  delegate: string
  ownership_model: string
  owner: string
}

export interface Supply {
  print_max_supply: number
  print_current_supply: number
  edition_nonce: number
}

export interface TokenInfo {
  supply: number
  decimals: number
  token_program: string
  associated_token_address: string
}

export interface Inscription {
  contentType: string
  encoding: string
  validationHash: string
  inscriptionDataAccount: string
  authority: string
}
