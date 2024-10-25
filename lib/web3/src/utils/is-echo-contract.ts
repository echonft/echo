import type { Contract } from '@echo/model/types/contract'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { equals } from 'ramda'

export function isEchoContract(contract: Contract): boolean {
  return equals(contract.address, getEchoAddress(contract.chain))
}
