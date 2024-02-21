import type { Contract } from '@echo/model/types/contract'
import type { HexString } from '@echo/utils/types/hex-string'

export interface GetErc721ContractApprovalArgs {
  contract: Contract
  owner: HexString
}
