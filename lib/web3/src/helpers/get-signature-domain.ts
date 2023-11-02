import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'

export function getSignatureDomain(chainId: number) {
  return {
    name: 'Echo',
    version: '1',
    chainId,
    verifyingContract: getEchoAddress(chainId)
  }
}
