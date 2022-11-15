import { ContractMetadata } from '@echo/frontend/lib/services/alchemy/models/contract-metadata'
import { Nft } from 'alchemy-sdk'

export interface NftWithMetadata extends Nft {
  contractMetadata?: ContractMetadata
}
