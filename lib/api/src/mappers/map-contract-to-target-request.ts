import { TargetRequest } from '../types'
import { Contract } from '@echo/model'

export function mapContractToTargetRequest(contract: Contract): TargetRequest {
  return { address: contract.address, chainId: contract.chainId }
}
