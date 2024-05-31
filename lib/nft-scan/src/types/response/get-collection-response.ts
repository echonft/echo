export interface GetCollectionResponse {
  contract_address: string
  name: string
  symbol: string
  description: string | null
  website: string | null
  email: string | null
  twitter: string | null
  discord: string | null
  telegram: string | null
  github: string | null
  instagram: string | null
  medium: string | null
  logo_url: string | null
  banner_url: string | null
  featured_url: string | null
  large_image_url: string | null
  erc_type: 'erc721' | 'erc1155'
  deploy_block_number: number
  owner: string
  verified: boolean
  opensea_verified: boolean
  is_spam: boolean
  royalty: number | null
  items_total: number
  amounts_total: number
  owners_total: number
  opensea_floor_price: number | null
  opensea_slug: string | null
  floor_price: number | null
  collections_with_same_name: string[]
  price_symbol: string
}
