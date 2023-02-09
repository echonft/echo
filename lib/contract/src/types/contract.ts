import { ContractInterface } from 'ethers'

export interface Contract {
  addressOrName: string
  contractInterface: ContractInterface
}
