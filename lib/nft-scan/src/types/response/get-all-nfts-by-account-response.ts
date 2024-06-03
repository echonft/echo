import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'

export interface GetAllNftsByAccountDataResponse {
  assets: NftResponse[]
  contract_address: string
  contract_name: string
  description: string
  floor_price: number | null
  is_spam: boolean
  items_total: number
  logo_url: string | null
  opensea_verified: boolean
  owns_total: number
  symbol: string
  verified: boolean
}
