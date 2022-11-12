import { ContractMetadata } from '@lib/models/alchemy/contract-metadata'
import { Nft } from 'alchemy-sdk'

export interface NftWithMetadata extends Nft {
  contractMetadata?: ContractMetadata
}
