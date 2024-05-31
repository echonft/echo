import type { AttributeResponse } from '@echo/nft-scan/types/response/attribute-response'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'

export interface NftResponse {
  contract_address: HexString
  contract_name: string
  contract_token_id: string
  token_id: string
  erc_type: 'erc721' | 'erc1155'
  amount: string
  minter: string
  owner: string
  own_timestamp: number
  mint_timestamp: number
  mint_transaction_hash: string
  mint_price: number
  token_uri: string | null
  metadata_json: string | null
  name: string | null
  content_type: string | null
  content_uri: string | null
  description: string | null
  image_uri: string | null
  external_link: string | null
  latest_trade_price: number | null
  latest_trade_symbol: string | null
  latest_trade_token: string | null
  latest_trade_timestamp: number | null
  nftscan_id: string
  nftscan_uri: string | null
  small_nftscan_uri: string | null
  attributes: Nullable<AttributeResponse[]>
  rarity_score: number | null
  rarity_rank: number | null
}
