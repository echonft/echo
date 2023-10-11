import { echoAddress } from '@echo/utils/constants/echo-address'

export function getSignatureDomain(chainId: number) {
  return {
    name: 'Echo',
    version: '1',
    chainId,
    verifyingContract: echoAddress
  }
}
