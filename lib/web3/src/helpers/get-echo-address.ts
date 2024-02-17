import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { formatAddress } from '@echo/web3/helpers/format-address'

function echoAddressByChainId(chainId: number) {
  switch (chainId) {
    case 11155111:
      return '0x514EbbfcE272B8b2e54c5E82512867B1Faf87420'
    default:
      throw Error(`chain ${chainId} not supported`)
  }
}

export function getEchoAddress() {
  const chainId = getChainId()
  return formatAddress({ address: echoAddressByChainId(chainId), chainId })
}
