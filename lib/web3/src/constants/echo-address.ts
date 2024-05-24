import { SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import { getCurrentChainId } from '@echo/utils/helpers/get-current-chain-id'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { pipe } from 'ramda'

function echoAddressByChainId(chainId: number) {
  switch (chainId) {
    case SEPOLIA_CHAIN_ID:
      return { address: '0xf7f19bf282a2260940c910F88eC70BbcF51Cf572', chainId }
    default:
      throw Error(`chain ${chainId} not supported`)
  }
}

export const ECHO_ADDRESS = pipe(getCurrentChainId, echoAddressByChainId, formatAddress)()
