import type { NftAttributeResponse } from '@echo/nft-scan/types/response/nft-attribute-response'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'

export interface NftResponse {
  amount: string
  attributes: Nullable<NftAttributeResponse[]>
  content_type: string | null
  content_uri: string | null
  contract_address: HexString
  contract_name: string
  contract_token_id: string
  description: string | null
  erc_type: 'erc721' | 'erc1155'
  external_link: string | null
  image_uri: string | null
  latest_trade_price: number | null
  latest_trade_symbol: string | null
  latest_trade_timestamp: number | null
  latest_trade_token: string | null
  metadata_json: string | null
  mint_price: number
  mint_timestamp: number
  mint_transaction_hash: string
  minter: string
  name: string | null
  nftscan_id: string
  nftscan_uri: string | null
  own_timestamp: number | null
  owner: string
  rarity_rank: number | null
  rarity_score: number | null
  small_nftscan_uri: string | null
  token_id: string
  token_uri: string | null
}
