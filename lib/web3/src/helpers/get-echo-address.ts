import { formatAddress } from '@echo/web3/helpers/format-address'

function echoAddressByChainId(chainId: number) {
  switch (chainId) {
    case 11155111:
      return '0x514EbbfcE272B8b2e54c5E82512867B1Faf87420'
    default:
      throw Error(`chain ${chainId} not supported`)
  }
}

export function getEchoAddress(chainId: number) {
  return formatAddress({ address: echoAddressByChainId(chainId), chainId })
}
