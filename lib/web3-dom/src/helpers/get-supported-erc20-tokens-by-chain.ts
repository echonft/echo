import type { ERC20Token } from '@echo/model/types/erc20-token'
import type { ChainName } from '@echo/utils/types/chain-name'
import {
  blastSupportedErc20Tokens,
  ethereumSupportedERC20Tokens,
  sepoliaSupportedERC20Tokens
} from '@echo/web3-dom/constants/supported-erc20-tokens'

export function getSupportedErc20TokensByChain(chain: ChainName): ERC20Token[] {
  switch (chain) {
    case 'blast':
    case 'blast_sepolia':
      return blastSupportedErc20Tokens
    case 'ethereum':
      return ethereumSupportedERC20Tokens
    case 'sepolia':
      return sepoliaSupportedERC20Tokens
  }
}
