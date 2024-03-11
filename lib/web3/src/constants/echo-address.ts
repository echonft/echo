import { SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { pipe } from 'ramda'

function echoAddressByChainId(chainId: number) {
  switch (chainId) {
    case SEPOLIA_CHAIN_ID:
      return { address: '0x8a2DF6bEd06Da735e5a75C3949DBb04665213E64', chainId }
    default:
      throw Error(`chain ${chainId} not supported`)
  }
}

export const ECHO_ADDRESS = pipe(getChainId, echoAddressByChainId, formatAddress)()
