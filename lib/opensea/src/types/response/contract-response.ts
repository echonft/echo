import type { CollectionContractResponse } from '@echo/opensea/types/response/collection-contract-response'

export interface ContractResponse extends CollectionContractResponse {
  collection: string
  contract_standard: 'ERC721' | 'ERC1155'
  name: string
  total_supply: number
}
