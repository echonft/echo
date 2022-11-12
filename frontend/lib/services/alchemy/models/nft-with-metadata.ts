import { ContractMetadata } from '@lib/alchemy/models/contract-metadata'
import { Nft } from 'alchemy-sdk'

export interface NftWithMetadata extends Nft {
  contractMetadata?: ContractMetadata
}
