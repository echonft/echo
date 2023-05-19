export interface GetNftsForOwnerRequest {
  owner: string
  contractAddresses: string[] // max 45
  pageKey?: string
  pageSize?: number // max 100
}
