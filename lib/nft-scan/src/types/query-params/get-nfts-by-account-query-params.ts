export interface GetNftsByAccountQueryParams {
  erc_type: 'erc721' | 'erc1155'
  cursor?: string
  limit: number
  show_attribute: boolean
}
