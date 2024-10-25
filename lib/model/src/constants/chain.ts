import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import { Network } from '@echo/utils/constants/network'

export enum Chain {
  Blast = 'blast',
  BlastSepolia = 'blast_sepolia',
  Ethereum = 'ethereum',
  Sepolia = 'sepolia',
  Sei = 'sei'
}

export const chains = {
  blast: {
    id: 81457,
    name: Chain.Blast,
    vm: VirtualMachine.Evm,
    network: Network.Mainnet,
    supported: true
  },
  blast_sepolia: {
    id: 168587773,
    name: Chain.BlastSepolia,
    vm: VirtualMachine.Evm,
    network: Network.Testnet,
    supported: true
  },
  ethereum: {
    id: 1,
    name: Chain.Ethereum,
    vm: VirtualMachine.Evm,
    network: Network.Mainnet,
    supported: false
  },
  sepolia: {
    id: 11155111,
    name: Chain.Sepolia,
    vm: VirtualMachine.Evm,
    network: Network.Testnet,
    supported: false
  },
  sei: {
    id: 1329,
    name: Chain.Sei,
    vm: VirtualMachine.Evm,
    network: Network.Mainnet,
    supported: false
  }
} as const
