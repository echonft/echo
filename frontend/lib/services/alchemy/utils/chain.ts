import { config } from '@echo/frontend/lib/config/config'
import { Network } from 'alchemy-sdk'

/**
 * Get the alchemy chain for the environment
 * TODO We should have a way to use different chains
 */
export function getAlchemyChain() {
  if (config().useTestnet) {
    return Network.ETH_GOERLI
  } else {
    return Network.ETH_MAINNET
  }
}
