import { SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { pipe } from 'ramda'

function echoAddressByChainId(chainId: number) {
  switch (chainId) {
    case SEPOLIA_CHAIN_ID:
      return { address: '0x514EbbfcE272B8b2e54c5E82512867B1Faf87420', chainId }
    default:
      throw Error(`chain ${chainId} not supported`)
  }
}

export const ECHO_ADDRESS = pipe(getChainId, echoAddressByChainId, formatAddress)()
