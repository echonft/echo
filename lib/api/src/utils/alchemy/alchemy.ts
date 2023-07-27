import { isMainnet } from '@echo/utils'
import { Alchemy, Network } from 'alchemy-sdk'

export function getAlchemy() {
  const config = {
    // TODO Should be its own key
    apiKey: process.env.ALCHEMY_API_KEY,
    network: isMainnet ? Network.ETH_MAINNET : Network.ETH_GOERLI
  }
  // We should use the multichain config
  return new Alchemy(config)
}
