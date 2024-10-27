import type { Contract } from '@echo/model/types/contract'
import { echoAddress } from '@echo/web3/helpers/echo-address'
import { equals } from 'ramda'

export function isEchoContract(contract: Contract): boolean {
  return equals(contract.address, echoAddress(contract.chain))
}
