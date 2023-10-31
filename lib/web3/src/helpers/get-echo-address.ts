import { formatAddress } from '@echo/utils/helpers/format-address'

function getAddress(chainId: number) {
  switch (chainId) {
    case 11155111:
      return '0x2837Ad78E15B9280f522C91C5f5D75a3A2f9f76e'
    default:
      throw Error(`chain ${chainId} not supported`)
  }
}

export function getEchoAddress(chainId: number) {
  return formatAddress(getAddress(chainId), chainId)
}
