import type { Contract } from '@echo/model/types/collection'
import type { HexString } from '@echo/utils/types/hex-string'

export interface GetErc721ContractApprovalArgs {
  contract: Contract
  owner: HexString
}
