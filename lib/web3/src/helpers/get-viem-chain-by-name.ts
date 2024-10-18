import { Chain } from '@echo/utils/constants/chain'
import { ChainError } from '@echo/web3/constants/errors/chain-error'
import type { Chain as ViemChain } from 'viem'
import { blast, blastSepolia, mainnet, sei, sepolia } from 'viem/chains'

export function getViemChainByName(name: Chain): ViemChain {
  switch (name) {
    case Chain.Blast:
      return blast
    case Chain.BlastSepolia:
      return blastSepolia
    case Chain.Ethereum:
      return mainnet
    case Chain.Sepolia:
      return sepolia
    case Chain.Sei:
      return sei
    default:
      throw Error(ChainError.NotSupported)
  }
}
