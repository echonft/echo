import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { ChainName } from '@echo/utils/types/chain-name'

export function getBaseUrl(chain: ChainName) {
  if (isTestnetChain(chain)) {
    return 'https://testnets-api.opensea.io/api/v2'
  }
  return 'https://api.opensea.io/api/v2'
}
