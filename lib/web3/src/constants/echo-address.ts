import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { pipe } from 'ramda'

function echoAddressByChainId(chainId: number) {
  switch (chainId) {
    case 11155111:
      return { address: '0x514EbbfcE272B8b2e54c5E82512867B1Faf87420', chainId }
    default:
      throw Error(`chain ${chainId} not supported`)
  }
}

export const echoAddress = pipe(getChainId, echoAddressByChainId, formatAddress)()
